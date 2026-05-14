import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
    trim: true,
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
});

const userInformationSchema = new mongoose.Schema(
  
    // ✅ STILL USE ObjectId (This is the internal ID found via email)
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true, 
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    studyLevel: {
      type: String,
      enum: ["Matric", "FSc", "Graduated"],
      required: true,
    },

    institute: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      required: true,
    },

    // ✅ ONLY for completed users (graduation/completion year)
    completionYear: {
      type: Number,
      default: null,
    },

    // Only for university (optional depending on your UI)
    semester: {
      type: Number,
      default: null,
    },

    cgpa: {
      type: Number,
      min: 0,
      max: 4,
      default: null,
    },
     skills: [skillSchema],
     interests: [
      {
        type: String,
        trim: true,
      },
    ],
    resume: {
  fileName: {
    type: String,
    default: null,
  },

  filePath: {
    type: String,
    default: null,
  },

  fileType: {
    type: String,
    enum: ["pdf", "doc", "docx"],
    default: null,
  },
},
profileCompleted: {
  type: Boolean,
  default: false,
}
  },
  { timestamps: true }
);
const UserInformation = mongoose.model("UserInformation", userInformationSchema);
export default UserInformation;