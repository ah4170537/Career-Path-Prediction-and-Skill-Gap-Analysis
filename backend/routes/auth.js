const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendOTPEmail = require('../mailer');

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

    
    // UPDATE: Include the user data in the response
    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        name: user.name,          // Assuming your Schema has a 'name' field
        profileImage: user.profileImage || null, // Send null if no image exists yet
        Userid:user._id,
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
    const {
      userId,
      fullName,
      studyLevel,
      institute,
      field,
      status,
      completionYear,
      semester,
      cgpa,
      skills,
      interests,
      resume,
    } = req.body;

    // 🔴 check if profile already exists
    const existingProfile = await UserInformation.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    // 🟢 create new profile
    const userInfo = new UserInformation({
      userId,
      fullName,
      studyLevel,
      institute,
      field,
      status,
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
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;
