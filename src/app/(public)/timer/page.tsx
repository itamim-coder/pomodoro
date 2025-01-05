"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  completeSession,
  decrementTime,
  pauseTimer,
  resetTimer,
  startTimer,
} from "@/redux/features/timerSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetFocusMetricsQuery,
  useGetStreaksQuery,
  usePostFocusSessionMutation,
} from "@/redux/features/session/sessionApi";

const PomodoroTimer = () => {
  const dispatch = useAppDispatch();
  const { seconds, isActive, isFocus } = useAppSelector((state) => state.timer);
  const user = useAppSelector(selectCurrentUser);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
  });
  const { data: userStreak, isLoading } = useGetStreaksQuery(undefined);
  const { data: focusMetrics } = useGetFocusMetricsQuery(undefined);
  const userId = user?.userId; // Replace with actual user ID
  const [postFocusSession] = usePostFocusSessionMutation();

  // Handle session completion and logging
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const logFocusSession = async () => {
      const duration = 1 * 60; // Set duration to 1 minute (60 seconds)
      const sessionType = isFocus ? "focus" : "break";

      try {
        const data = {
          userId,
          duration, // Store the duration in seconds (1 min)
          sessionType,
        };

        // If you need to dispatch some API call or log, you can re-enable below
        const res = await postFocusSession(data).unwrap();
        console.log(res, "timer");

        setStreakData(userStreak); // Optional: can refactor this if needed after session completion
      } catch (error) {
        console.error("Failed to log focus session:", error);
      }
    };

    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          dispatch(decrementTime());
        } else {
          dispatch(completeSession()); // Ends session
          logFocusSession(); // Log session when completed
        }
      }, 1000);
    } else {
      clearInterval(timer); // Pause the interval when not active
    }

    return () => clearInterval(timer); // Cleanup the interval after useEffect is done
  }, [isActive, seconds, dispatch, isFocus, userId, userStreak]);

  // Play sound or display visual cue when session ends
  useEffect(() => {
    if (seconds === 0) {
      const audio = new Audio("/success.mp3"); // Keep your sound file in the public folder

      const playAudio = () => audio.play();

      if (audio) {
        audio.addEventListener("canplaythrough", playAudio, { once: true });
      }
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error); // To handle errors like autoplay restrictions
      });
    }
  }, [seconds, isFocus]);

  // Timer display and session types (Focus/Break)
  const formattedTime = `${Math.floor(seconds / 60)}:${
    seconds % 60 < 10 ? "0" : ""
  }${seconds % 60}`;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 to-purple-400 p-4">
      {/* Timer Card */}
      <Card className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white bg-opacity-80">
        <h3 className="text-center text-xl font-semibold mb-4">
          {isFocus ? "Focus Time" : "Break Time"}
        </h3>
        <h3 className="text-center text-3xl font-bold mb-6">{formattedTime}</h3>

        <Progress
          value={(1 - seconds / 60) * 100} // Calculate progress based on 60 seconds
          className="mb-6 h-2 bg-indigo-500 rounded-full"
        />
        <div className="flex justify-around gap-4 mb-6">
          <Button
            variant="primary"
            onClick={() => {
              if (!isActive) {
                dispatch(startTimer());
              } else {
                dispatch(pauseTimer());
              }
            }}
            className={`border-2 ${
              isActive ? "border-yellow-500" : "border-green-500"
            }`}
          >
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button
            className="border border-red-400"
            variant="danger"
            onClick={() => dispatch(resetTimer())}
          >
            Reset
          </Button>
        </div>

        {/* Streak Data */}
        <div className="mt-4 text-center">
          <h4 className="text-lg">
            Current Streak:{" "}
            <span className="font-bold">{userStreak?.currentStreak}</span>
          </h4>
          <h4 className="text-lg">
            Longest Streak:{" "}
            <span className="font-bold">{userStreak?.longestStreak}</span>
          </h4>
          <h4 className="text-lg">
            Today's Sessions:{" "}
            <span className="font-bold">
              {focusMetrics?.dailyMetrics[0]?.sessionCount}
            </span>
          </h4>
        </div>

        {/* Badges Section */}
        <div className="mt-6">
      

        </div>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
