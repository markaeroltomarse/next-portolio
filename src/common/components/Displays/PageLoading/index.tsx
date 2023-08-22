import React, { useEffect, useState } from "react";
import "./modules/loading.module.css"; // Import your CSS file for styling

interface ILoading {
  onLoaded: () => void;
}

const LoadingAnimation: React.FC<ILoading> = (props) => {
  const { onLoaded } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 100) {
        setCount((prevCount) => prevCount + 1);
      } else {
        setTimeout(() => onLoaded?.(), 1000);
        clearInterval(interval);
      }
    }, 20); // You can adjust the interval duration for the desired animation speed

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div
      className={`loading-container h-[100vh] fixed top-0 left-0 w-full flex items-center justify-center flex-col transition-all gap-3 ${
        count >= 100 && "opacity-0"
      }`}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" data-aos="zoom-in">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="10"
          stroke="#7f8c8d"
          strokeDasharray="283"
          strokeDashoffset={(283 * (100 - count)) / 100}
          strokeLinecap="round"
        />
      </svg>
      <div data-aos="zoom-in" className="loading-text text-2xl">
        {count}%
      </div>
    </div>
  );
};

export default LoadingAnimation;
