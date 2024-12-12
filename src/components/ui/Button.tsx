import { ReactNode, MouseEventHandler } from "react";
import { cn } from "@utils/index";

interface Props {
  children: ReactNode; // The content inside the button (text, icon, etc.)
  onClick?: MouseEventHandler<HTMLButtonElement>; // Click handler for button clicks.
  type?: "default" | "primary" | "secondary" | "danger" | "dark"; // Button style types.
  size?: "sm" | "md" | "lg" | "xs"; // Button size options.
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string; // Additional classes for custom styling.
  ghost?: boolean; // If true, use border-based styles (ghost).
  rounded?: boolean; // If true, make the button fully rounded (pill-shaped).
}

export const bgClass = {
  default: "bg-default text-black hover:bg-gray-200", // Neutral background.
  primary: "bg-primary text-white hover:bg-blue-500", // Primary action button.
  secondary: "bg-secondary text-white", // Secondary action button.
  danger: "bg-danger text-white", // Danger button (e.g., delete actions).
  dark: "bg-white  text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-between ", // Dark-themed button.
};

// Map for border-based styles (used when ghost is true).
export const borderClass = {
  default: "border-white border-4 text-white hover:scale-105 active:scale-95 ", // Neutral ghost style.
  primary: "border-blue-400 border-4   hover:scale-105 active:scale-95", // Ghost style for primary action.
  secondary:
    "border-secondary border-4 text-secondary  hover:scale-105 active:scale-95", // Ghost style for secondary action.
  danger:
    "border-red-400  border-4 text-white  hover:scale-105 active:scale-95", // Danger ghost style.
  dark: "border-gray-300  border-4 text-white  hover:scale-105 active:scale-95", // Dark ghost style.
};

// Map for size-specific padding styles.
export const sizeClass = {
  xs: "px-3 py-3",
  sm: "px-4 py-4", // Small size padding.
  md: "px-10 py-4", // Medium size padding.
  lg: "px-16 py-5 ", // Large size padding.
};
export const shadowClasses = {
  none: "",
  sm: "shadow-sm", // Small size padding.
  md: "shadow-md", // Medium size padding.
  lg: "shadow-lg", // Large size padding.
  xl: "shadow-xl ", // Large size padding.
  "2xl": "shadow-2xl ", // Large size padding.
};

const Button = ({
  children,
  onClick,
  type = "default", // Default button type.
  size = "md", // Default button size.
  className = "", // No additional classes by default.
  ghost = false, // Default to non-ghost (background style).
  rounded = false, // Default to standard rounded corners.
  shadow = "none",
}: Props) => {
  // Map for background-based styles (used when ghost is false).

  return (
    <button
      onClick={onClick}
      className={cn(
        "h-auto flex items-center justify-center   shadow-[#00000054]",
        sizeClass[size],
        rounded ? "rounded-full" : "rounded-lg",
        ghost ? borderClass[type] : bgClass[type],
        className,
        shadowClasses[shadow]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
