import React from "react";

interface PaginationDotsProps {
  numDots: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  numDots,
  activeIndex,
  onClick,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: numDots }, (_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full mx-1 focus:outline-none transition ${
            activeIndex === index
              ? "bg-slate-700 scale-125"
              : "bg-gray-400 scale-100"
          }`}
          onClick={() => onClick(index)}
        ></button>
      ))}
    </div>
  );
};

export default PaginationDots;
