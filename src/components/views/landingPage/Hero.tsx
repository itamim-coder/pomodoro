"use client";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { completeSession, decrementTime, pauseTimer, resetTimer, startTimer } from "@/redux/features/timerSlice";

const PomodoroTimer = () => {
  const dispatch = useAppDispatch();
  const { seconds, isActive, isFocus, sessionCount, streak } = useAppSelector(
    (state) => state.timer
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          dispatch(decrementTime());
        } else {
          dispatch(completeSession());
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 place-items-center pt-5 lg:pt-28 pb-4 lg:pb-16">
      <Card className="w-full md:w-1/2 mx-auto p-4">
        <h3 variant="h4" className="text-center mb-2">
          {isFocus ? "Focus Time" : "Break Time"}
        </h3>
        <h3 variant="h5" className="text-center mb-4">
          {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
          {seconds % 60}
        </h3>

        <Progress value={((1500 - seconds) / 1500) * 100} className="mb-4" />

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

        <h3 variant="subtitle1" className="text-center mt-4">
          Sessions: {sessionCount} | Streak: {streak}
        </h3>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
