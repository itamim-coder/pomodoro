"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

const PomodoroTimer = () => {
  const dispatch = useAppDispatch();
  const { seconds, isActive, isFocus } = useAppSelector((state) => state.timer);

  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
  });
  const userId = "1"; // Replace with your actual user ID
  console.log(streakData);
  // Fetch streak and badges data on component mount
  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/session/streaks/${userId}`
        );
        setStreakData(response.data);
      } catch (error) {
        console.error("Failed to fetch streak data:", error);
      }
    };

    fetchStreakData();
  }, [userId]);

  // Handle session completion and logging
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const logFocusSession = async () => {
      const duration = isFocus ? 10 : 3; // Replace with actual session lengths
      const sessionType = isFocus ? "focus" : "break";

      try {
        await axios.post(`http://localhost:5000/api/v1/session/focus-session`, {
          userId,
          duration,
          sessionType,
        });
        // Optionally refetch streak data after logging a session
        const response = await axios.get(`/streaks`, { params: { userId } });
        setStreakData(response.data);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 place-items-center pt-5 lg:pt-28 pb-4 lg:pb-16">
      <Card className="w-full md:w-1/2 mx-auto p-4">
        <h3 className="text-center mb-2">
          {isFocus ? "Focus Time" : "Break Time"}
        </h3>
        <h3 className="text-center mb-4">
          {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
          {seconds % 60}
        </h3>
        <Progress
          value={(1 - seconds / (isFocus ? 1500 : 300)) * 100}
          className="mb-4"
        />
        <div className="flex gap-4 justify-center">
          <Button variant="primary" onClick={() => dispatch(startTimer())}>
            Start
          </Button>
          <Button variant="secondary" onClick={() => dispatch(pauseTimer())}>
            Pause
          </Button>
          <Button variant="danger" onClick={() => dispatch(resetTimer())}>
            Reset
          </Button>
        </div>

        {/* Streak Data */}
        <div className="mt-6 text-center">
          <h4>Current Streak: {streakData?.data?.currentStreak}</h4>
          <h4>Longest Streak: {streakData?.data?.longestStreak}</h4>
        </div>

        {/* Badges */}
        <div className="mt-6">
          <h4 className="text-center mb-2">Achievements</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {streakData?.badges?.length > 0 ? (
              streakData?.badges?.map((badge, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {badge}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-center">No badges earned yet.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
