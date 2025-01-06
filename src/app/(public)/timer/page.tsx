"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  completeSession,
  decrementTime,
  pauseTimer,
  resetTimer,
  startTimer,
} from "@/redux/features/timer/timerSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetFocusMetricsQuery,
  useGetStreaksQuery,
  usePostFocusSessionMutation,
} from "@/redux/features/session/sessionApi";
import ProgressBar from "@/components/views/progressBar";

const PomodoroTimer = () => {
  const dispatch = useAppDispatch();
  const { seconds, isActive, isFocus } = useAppSelector((state) => state.timer);
  const user = useAppSelector(selectCurrentUser);
  const [postFocusSession] = usePostFocusSessionMutation();

  const { data: userStreak } = useGetStreaksQuery(undefined);
  const { data: focusMetrics } = useGetFocusMetricsQuery(undefined);

  const userId = user?.userId;
  const sessionDuration = 1500; // 25 minutes in seconds

  // Timer management logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const logFocusSession = async () => {
      const sessionType = isFocus ? "focus" : "break";

      try {
        const data = { userId, duration: sessionDuration, sessionType };
        if (sessionType === "focus") {
          await postFocusSession(data).unwrap();
        }
      } catch (error) {
        console.error("Failed to log focus session:", error);
      }
    };

    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          dispatch(decrementTime());
        } else {
          dispatch(completeSession());
          logFocusSession();
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds, dispatch, isFocus, userId]);

  // Play sound/visual cue when timer ends
  useEffect(() => {
    if (seconds === 0) {
      const audio = new Audio("/success.mp3");
      audio.play().catch((error) => console.error("Audio playback error:", error));
    }
  }, [seconds]);

  const formattedTime = `${Math.floor(seconds / 60)}:${
    seconds % 60 < 10 ? "0" : ""
  }${seconds % 60}`;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 to-purple-400 p-4">
      <Card className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white bg-opacity-80">
        <h3 className="text-center text-xl font-semibold mb-4">
          {isFocus ? "Focus Time" : "Break Time"}
        </h3>
        <h3 className="text-center text-3xl font-bold mb-6">{formattedTime}</h3>

        {/* Dynamic ProgressBar Component */}
        <ProgressBar
          current={sessionDuration - seconds}
          milestone={sessionDuration}
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

        {/* Streak and Focus Data */}
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
      </Card>
    </div>
  );
};

export default PomodoroTimer;
