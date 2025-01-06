"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  useGetBadgesQuery,
  useGetFocusMetricsQuery,
  useGetStreaksQuery,
} from "@/redux/features/session/sessionApi";
import { BarCharts } from "@/components/views/Charts/BarChart";
import RadialChart from "@/components/views/Charts/RadialChart";

const FocusDashboard = () => {
  // Fetch data from APIs
  const { data: streakData } = useGetStreaksQuery(undefined);
  const { data: focusMetricsData } = useGetFocusMetricsQuery(undefined);
  const { data: badgesData } = useGetBadgesQuery(undefined);

  if (!focusMetricsData || !streakData || !badgesData) {
    return <div>Loading...</div>;
  }

  const todayMetrics = focusMetricsData.todayMetrics;
  const weeklyMetrics = focusMetricsData.weeklyMetrics;
  const overallMetrics = focusMetricsData.overallMetrics;
  const dailyMetrics = focusMetricsData.dailyMetrics;
  const badges = badgesData.map((badge) => badge.badgeName);

  const streak = streakData.currentStreak;
  const longestStreak = streakData.longestStreak;

  const chartData = {
    labels: dailyMetrics.map((metric: any) => metric.date),
    datasets: [
      {
        label: "Focus Time (minutes)",
        data: dailyMetrics.map((metric: any) => metric.totalFocusTime),
        backgroundColor: "#4caf50",
      },
    ],
  };

  const formattedTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}hr ${minutes}min`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
 

      {/* First Section: Full-width cards for streak, message, badges */}
      <div className="grid shadow-md p-6 rounded-md grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Streak Progress */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="text-lg font-medium mb-2">Streak Progress</h4>
          <Progress value={(streak / 10) * 100} className="mt-2" />
        </div>
        {/* Motivational Message */}
        <div className="col-span-1 md:col-span-3">
          {/* <h4 className="text-lg font-medium mb-2">Motivational Message</h4> */}
          <div className="text-center">
            {streak >= 10 ? (
              <h3 className="text-green-600">
                🌟 Amazing! You're on a {streak}-day streak! Keep going!
              </h3>
            ) : (
              <h3 className="text-green-600">
                👏 Great job! You're on a {streak}-day streak! Only{" "}
                {10 - streak} days to reach your milestone!
              </h3>
            )}
          </div>
        </div>

        {/* Achievements & Badges */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="text-lg font-medium mb-2">Badges</h4>
          <div className="flex flex-wrap gap-4 mt-4">
            {badges.map((badge, index) => (
              <Badge key={index} color="info">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Second Section: Two-column layout */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
        {/* Left: Bar chart */}
        <div className="col-span-1 shadow-md rounded-md p-6">
          <h4 className="text-lg font-medium mb-2">Daily Focus Metrics</h4>
          <BarCharts />
        </div>

        {/* Right: Focus Metrics Overview */}
        <div className="col-span-1 shadow-md rounded-md p-6 space-y-6">
          {/* Today's Metrics */}
          <div className="col-span-1">
            <h4 className="text-lg font-medium mb-2">Today's Metrics</h4>
            <p>Total Focus Time: {todayMetrics.formattedFocusTime}</p>
            <p>Sessions Completed: {todayMetrics.totalSessions}</p>
          </div>

          {/* Weekly Metrics */}
          <div className="col-span-1">
            <h4 className="text-lg font-medium mb-2">Weekly Metrics</h4>
            <p>Total Focus Time: {weeklyMetrics.totalFocusTime}</p>
            <p>Sessions Completed: {weeklyMetrics.totalSessions}</p>
          </div>

          {/* Overall Metrics */}
          <div className="col-span-1">
            <h4 className="text-lg font-medium mb-2">Overall Metrics</h4>
            <p>Total Focus Time: {overallMetrics.totalFocusTime}</p>
            <p>Sessions Completed: {overallMetrics.totalSessions}</p>
            <p>Longest Streak: {longestStreak} days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusDashboard;
