// timerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  seconds: number;
  isActive: boolean;
  isFocus: boolean; // true: Focus session, false: Break session
  sessionCount: number; // Number of completed sessions
  streak: number; // Current streak
  longestStreak: number; // Longest streak achieved
  badges: string[];
}

const initialState: TimerState = {
  seconds: 1500, // 25 minutes for Focus session
  isActive: false,
  isFocus: true,
  sessionCount: 0,
  streak: 0,
  longestStreak: 0,
  badges: [],
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
    skipTimer(state) {
      state.isActive = false;
      state.seconds = state.isFocus ? 30 : 10; // Reset to focus or break time
    },
    decrementTime(state) {
      if (state.seconds > 0) {
        state.seconds -= 1;
      }
    },
    completeSession(state) {
      state.isActive = false;
      state.isFocus = !state.isFocus; // Toggle between Focus and Break
      state.seconds = state.isFocus ? 1500 : 300;

      if (!state.isFocus) {
        state.sessionCount += 1;
        state.streak += 1;
        state.longestStreak = Math.max(state.streak, state.longestStreak);

        // Award badges
        if (state.streak === 5 && !state.badges.includes("5-Day Streak")) {
          state.badges.push("5-Day Streak");
        }
        if (state.streak === 10 && !state.badges.includes("10-Day Streak")) {
          state.badges.push("10-Day Streak");
        }
        if (state.sessionCount >= 50 && !state.badges.includes("50 Sessions")) {
          state.badges.push("50 Sessions");
        }
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
  skipTimer,
  decrementTime,
  completeSession,
  resetStreak,
} = timerSlice.actions;

export default timerSlice.reducer;
