"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import { useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";


// Mock Data for Testing
const mockFocusMetrics = {
  totalFocusTime: 120, // in minutes
  totalSessions: 6,
  dailyMetrics: [
    { date: "2025-01-01", focusTime: 25 },
    { date: "2025-01-02", focusTime: 50 },
    { date: "2025-01-03", focusTime: 45 },
  ],
};

const FocusDashboard = () => {
  const { streak, longestStreak, sessionCount, badges } = useAppSelector(
    (state) => state.timer
  );

  const [data, setData] = useState<any>(null);

  // Simulate Fetching Data
  useEffect(() => {
    setTimeout(() => {
      setData(mockFocusMetrics); // Replace with API call later
    }, 1000);
  }, []);

  if (!data) return <div>Loading...</div>; // Loading state

  const chartData = {
    labels: data.dailyMetrics.map((metric: any) => metric.date),
    datasets: [
      {
        label: "Focus Time (minutes)",
        data: data.dailyMetrics.map((metric: any) => metric.focusTime),
        backgroundColor: "#4caf50",
      },
    ],
  };

  return (
    <Card className="w-full md:w-2/3 mx-auto p-4">
      <h3 variant="h4" className="text-center mb-4">
        Focus Dashboard
      </h3>

      {/* Daily Analytics Chart */}
      <h3 variant="h5" className="mb-4">
        Daily Focus Metrics
      </h3>
      {/* <Bar data={chartData} /> */}

      {/* Progress Bar for Streak Milestone */}
      <div className="mt-6">
        <h3 variant="h5">Streak Progress</h3>
        <Progress
          value={(streak / 10) * 100}
          className="mt-2"
        />
        <h3>{`You are ${10 - streak} streaks away from a 10-day milestone!`}</h3>
      </div>

      {/* Motivational Messages */}
      {streak > 0 && (
        <div className="mt-4 text-green-600 text-center">
          {streak >= 10 ? (
            <h3 variant="subtitle1">
              🌟 Amazing! You're on a 10-day streak! Keep going!
            </h3>
          ) : (
            <h3 variant="subtitle1">
              👏 Great job! You're on a {streak}-day streak!
            </h3>
          )}
        </div>
      )}

      {/* Achievements and Badges */}
      <div className="mt-6">
        <h3 variant="h5">Achievements</h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {badges.map((badge, index) => (
            <Badge key={index} color="info">
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {/* Overall Focus Stats */}
      <div className="mt-6">
        <h3 variant="subtitle1">
          Total Focus Time: {data.totalFocusTime} minutes
        </h3>
        <h3 variant="subtitle1">
          Total Sessions Completed: {sessionCount}
        </h3>
        <h3 variant="subtitle1">
          Longest Streak: {longestStreak} days
        </h3>
      </div>
    </Card>
  );
};

export default FocusDashboard;
