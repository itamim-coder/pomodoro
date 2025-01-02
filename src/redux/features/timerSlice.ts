// timerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  seconds: number;
  isActive: boolean;
  isFocus: boolean; // true: Focus session, false: Break session
  sessionCount: number; // Number of completed sessions
  streak: number; // Current streak
  longestStreak: number; // Longest streak achieved
}

const initialState: TimerState = {
  seconds: 1500, // 25 minutes for Focus session
  isActive: false,
  isFocus: true,
  sessionCount: 0,
  streak: 0,
  longestStreak: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer(state) {
      state.isActive = true;
    },
    pauseTimer(state) {
      state.isActive = false;
    },
    resetTimer(state) {
      state.isActive = false;
      state.seconds = state.isFocus ? 1500 : 300; // Reset to focus or break time
    },
    decrementTime(state) {
      if (state.seconds > 0) {
        state.seconds -= 1;
      }
    },
    completeSession(state) {
      state.isActive = false;
      state.isFocus = !state.isFocus; // Toggle session type
      state.seconds = state.isFocus ? 1500 : 300; // Reset timer for next session

      if (!state.isFocus) {
        state.sessionCount += 1;
        state.streak += 1;
        state.longestStreak = Math.max(state.streak, state.longestStreak);
      }
    },
    resetStreak(state) {
      state.streak = 0; // Reset streak if user misses sessions
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  decrementTime,
  completeSession,
  resetStreak,
} = timerSlice.actions;

export default timerSlice.reducer;
