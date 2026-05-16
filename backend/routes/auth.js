const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserInformation = require("../models/UserInformation");
const sendOTPEmail = require('../mailer');
const upload = require("../middleware/upload");
const picupload = require("../middleware/picupload");
const fs = require("fs");
const router = express.Router();


// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email or password is incorrect' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email or password is incorrect' });

    const userProfile = await UserInformation.findOne({
  userId: user._id
});
    // UPDATE: Include the user data in the response
    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        name: user.name,          // Assuming your Schema has a 'name' field
        email: user.email,
        profileImage: user.profileImage || null, // Send null if no image exists yet
        Userid:user._id,
        profileCompleted: userProfile?.profileCompleted || false,
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Forget Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not registered' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = Date.now() + 60 * 1000;

    user.resetOtp = otp;
    user.resetOtpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Verify Otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.resetOtp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (Date.now() > user.resetOtpExpiry) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  res.json({ message: 'OTP verified' });
});


// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// User Information API

router.post("/user-information", async (req, res) => {
  try {
    let {
      userId,
  email,
  fullName,
  studyLevel,
  institute,
  program,
  Educationstatus,
  completionYear,
  semester,
  cgpa,
  skills,
  interests,
  resume,
} = req.body;


    // 🟢 create new profile
    const userInfo = new UserInformation({
      userId,
      email,
      fullName,
      studyLevel,
      institute,
      program,
      Educationstatus,
      completionYear,
      semester,
      cgpa,
      skills,
      interests,
      resume,
      profileCompleted: true,
    });

    await userInfo.save();

    res.json({
      message: "Profile saved successfully",
      userInfo,
    });
  } catch (err) {
  console.log("🔥 FULL BACKEND ERROR:", err);
  console.log("🔥 ERROR NAME:", err.name);
  console.log("🔥 ERROR MESSAGE:", err.message);

  return res.status(500).json({
    message: err.message,
  });
}
});


// Get User Information
router.get("/userinformation/:id", async (req, res) => {
  try {
    const user = await UserInformation.findOne({userId: req.params.id,});
    console.log("PARAM ID:", req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Update Personal Information 
router.put(
  "/userinformation/:id",
  upload.single("resume"),
  async (req, res) => {
    try {
      let updatedData = { ...req.body };

      // ==============================
      // 🔥 FIX: Parse FormData string fields
      // ==============================

      if (updatedData.interests) {
        try {
          updatedData.interests = JSON.parse(updatedData.interests);
        } catch (err) {
          console.log("INTEREST PARSE ERROR:", err.message);
          updatedData.interests = [];
        }
      }

      // ==============================
      // 🔢 Convert numeric fields
      // ==============================

      updatedData.semester = updatedData.semester
        ? Number(updatedData.semester)
        : null;

      updatedData.cgpa = updatedData.cgpa
        ? Number(updatedData.cgpa)
        : null;

      updatedData.completionYear = updatedData.completionYear
        ? Number(updatedData.completionYear)
        : null;

      // ==============================
      // 📄 Resume handling (Multer)
      // ==============================

      const oldUser = await UserInformation.findOne({
        userId: req.params.id,
      });

      if (req.file) {
        updatedData.resume = {
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
        };

        // delete old resume safely
        if (oldUser?.resume?.filePath) {
          try {
            if (fs.existsSync(oldUser.resume.filePath)) {
              fs.unlinkSync(oldUser.resume.filePath);
              console.log("OLD RESUME DELETED");
            }
          } catch (err) {
            console.log("DELETE ERROR:", err.message);
          }
        }
      }

      // ==============================
      // 🎓 Education validation
      // ==============================

      if (updatedData.Educationstatus === "completed") {
        if (!updatedData.completionYear) {
          return res.status(400).json({
            message: "Completion year is required",
          });
        }

        updatedData.semester = null;
        updatedData.cgpa = null;
      }

      if (updatedData.Educationstatus === "in-progress") {
        if (!updatedData.semester || !updatedData.cgpa) {
          return res.status(400).json({
            message: "Semester and CGPA are required",
          });
        }

        updatedData.completionYear = null;
      }

      // ==============================
      // 💾 Update DB
      // ==============================

      const updatedUser = await UserInformation.findOneAndUpdate(
        { userId: req.params.id },
        { $set: updatedData },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Upload Profile Image
router.put(
  "/upload-profile/:id",
  picupload.single("profileImage"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🗑 delete old image
      if (req.file && user.profileImage?.filePath) {
        try {
          if (fs.existsSync(user.profileImage.filePath)) {
            fs.unlinkSync(user.profileImage.filePath);
          }
        } catch (err) {
          console.log(err.message);
        }
      }

      // 📸 save new image
      if (req.file) {
        user.profileImage = {
          fileName: req.file.originalname,
          filePath: req.file.path.replace(/\\/g, "/"),
          fileType: req.file.mimetype,
        };
      }

      await user.save();

      res.status(200).json({
        message: "Profile image updated",
        data: user.profileImage,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
