"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type StreakData = {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
};

const RadialChart = ({ streakData }: { streakData: StreakData }) => {
  // Milestone value that you can change dynamically
  const milestone = 10;

  // Function to determine the color based on the streak count
  const getColorBasedOnStreak = (currentStreak: number): string => {
    if (currentStreak < 3) {
      return "hsl(0, 80%, 60%)"; // Red for very low streak
    } else if (currentStreak < 6) {
      return "hsl(30, 80%, 60%)"; // Yellow for medium streak
    } else if (currentStreak < 9) {
      return "hsl(60, 80%, 60%)"; // Light green for high streak
    } else {
      return "hsl(120, 80%, 60%)"; // Green for max streak or close to milestone
    }
  };

  // Get color dynamically based on current streak
  const streakColor = getColorBasedOnStreak(streakData.currentStreak);

  // Chart data with dynamic color based on streak count
  const chartData = [
    { name: "Streak", progress: streakData.currentStreak, fill: streakColor },
  ];

  const chartConfig = {
    progress: {
      label: "Streak Progress",
      color: streakColor, // Apply the color to the chart
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Streak Progress</CardTitle>
        <CardDescription>Your progress towards reaching the milestone</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="progress" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {streakData.currentStreak} / {milestone}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Days
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing your current streak progress towards the next milestone
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadialChart;
