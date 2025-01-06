"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetFocusMetricsQuery } from "@/redux/features/session/sessionApi";

export function BarCharts() {
  // Fetch daily focus metrics from the API
  const { data: focusMetricsData, isLoading } = useGetFocusMetricsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!focusMetricsData || !focusMetricsData.dailyMetrics) {
    return <div>No data available</div>;
  }

  // Transform the data for the chart
  const dailyMetrics = focusMetricsData.dailyMetrics.map((metric: any) => ({
    date: metric.date.slice(5), // Format the date to "MM-DD" for better display
    focusTime: metric.totalFocusTime, // Use focus time in minutes
  }));

  const chartConfig = {
    focusTime: {
      label: "Focus Time (minutes)",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
            <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={dailyMetrics}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="focusTime"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  );
}
