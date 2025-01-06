import React from "react";
import { Progress } from "../ui/progress";

interface ProgressBarProps {
  current: number;
  milestone: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, milestone }) => {
  const percentage = Math.min((current / milestone) * 100, 100);

  return (
    <div className="my-4">
      {/* <h3>{`Progress: ${current}/${milestone}`}</h3> */}
      <Progress value={percentage} className="mt-2" />
    </div>
  );
};

export default ProgressBar;
