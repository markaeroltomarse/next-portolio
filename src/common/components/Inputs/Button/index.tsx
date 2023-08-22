import { memo, useMemo } from "react";

export interface ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  noBorder?: boolean;
  fullRound?: boolean;
  name?: string;
  color?: "magenta" | "tertiary" | "transparent";
  borderColor?: "magenta" | "tertiary" | "black" | "white";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (_event: any) => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    style,
    className,
    color,
    borderColor,
    noBorder,
    fullRound,
    fullWidth,
    disabled,
    onClick,
    type,
  } = props;

  const colorClass = useMemo(() => {
    switch (color) {
      case "magenta":
        return "bg-magenta-6";
      case "tertiary":
        return "bg-tertiary-50";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-tertiary-50";
    }
  }, [color]);

  const borderColorClass = useMemo(() => {
    switch (borderColor) {
      case "magenta":
        return "border-magenta-6";
      case "tertiary":
        return "border-tertiary-50";
      case "white":
        return "border-white";
      case "black":
        return "border-[#212121]";
      default:
        if (color === "transparent") return "border-white";
        return "border-[#212121]";
    }
  }, [borderColor, color]);

  const borderClass = useMemo(() => {
    if (!noBorder) return "border-[0.063rem]";
    return "border-none";
  }, [noBorder]);

  const roundClass = useMemo(() => {
    if (fullRound) return "rounded-full";
    return "rounded-lg";
  }, [fullRound]);

  return (
    <button
      type={type || "button"}
      style={{ ...style }}
      className={`${className} ${colorClass} ${borderClass} ${borderColorClass} ${roundClass} ${
        fullWidth ? "w-full" : "w-fit"
      } ${
        disabled ? "grayscale" : ""
      } not-prose flex scale-100 items-center justify-center overflow-hidden px-6 py-[0.625rem] text-center transition-transform  hover:scale-105 active:scale-100`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
