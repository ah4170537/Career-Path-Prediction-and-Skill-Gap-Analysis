import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  studyLevel: "",
  institute: "",
  program: "",
  isCompleted: null,
  completionYear: "",
  semester: "",
  cgpa: "",
  skills: [],
  interests: [],
  resume: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
    state.skills = state.skills.filter(
        (s) => s.skillName !== action.payload
    );
},

    setInterests: (state, action) => {
      state.interests = action.payload;
    },

    setResume: (state, action) => {
      state.resume = action.payload;
    },

    resetProfile: () => initialState,
  },
});

export const {
  setField,
  addSkill,
  removeSkill,
  setInterests,
  setResume,
  resetProfile,
} = profileSlice.actions;



export default profileSlice.reducer;