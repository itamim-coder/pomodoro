"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="flex items-center space-x-4 ml-2">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={handleToggle}
                id="theme-toggle"
            />
            <Sun className={`h-5 w-5 ${theme === "dark" ? "hidden" : "block"}`} />
            <Moon className={`h-5 w-5 ${theme !== "dark" ? "hidden" : "block"}`} />
        </div>
    );
}