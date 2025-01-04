"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HomeBanner = () => {
  return (
    <>
      <div className="grid  min-h-screen grid-cols-1 md:grid-cols-1 gap-8 md:gap-12 lg:gap-16 place-items-center pt-5 lg:pt-28 pb-4 lg:pb-16">
        <section className="relative bg-gradient-to-r from-blue-500 to-blue-400 text-white py-12 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content: Text + CTAs */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Stay Focused, Be Productive
              </h1>
              <p className="text-lg lg:text-xl font-medium mb-6">
                Achieve your goals with our Pomodoro timer. Track streaks, earn
                badges, and stay on top of your productivity game.
              </p>
              <div className="flex justify-center lg:justify-start gap-4">
                <Button variant="primary" size="lg">
                  Start Now
                </Button>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content: Timer + Progress */}
            <div className="flex-1 bg-white text-blue-500 p-6 shadow-lg rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">Focus Timer</h2>
              <div className="text-5xl font-semibold mb-4">
                25:00 {/* Replace with dynamic timer */}
              </div>
              <Progress value={60} className="mb-6" />
              <p className="text-lg font-medium">
                Keep it up! You're 5 streaks away from your next milestone.
              </p>
            </div>
          </div>

          {/* Decorative Streak Indicator */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-500 to-red-500"></div>
        </section>
      </div>
    </>
  );
};

export default HomeBanner;
