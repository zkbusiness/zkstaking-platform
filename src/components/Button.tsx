import { ReactNode, MouseEventHandler } from "react";
import { cn } from "../utils";

interface Props {
  children: ReactNode; // The content inside the button (text, icon, etc.)
  onClick?: MouseEventHandler<HTMLButtonElement>; // Click handler for button clicks.
  type?: "default" | "primary" | "secondary" | "danger" | "dark"; // Button style types.
  size?: "sm" | "md" | "lg"; // Button size options.
  className?: string; // Additional classes for custom styling.
  ghost?: boolean; // If true, use border-based styles (ghost).
  rounded?: boolean; // If true, make the button fully rounded (pill-shaped).
}

const Button = ({
  children,
  onClick,
  type = "default", // Default button type.
  size = "md", // Default button size.
  className = "", // No additional classes by default.
  ghost = false, // Default to non-ghost (background style).
  rounded = false, // Default to standard rounded corners.
}: Props) => {
  // Map for background-based styles (used when ghost is false).
  const bgClass = {
    default: "bg-default text-black hover:bg-gray-200", // Neutral background.
    primary: "bg-primary text-white hover:bg-blue-500", // Primary action button.
    secondary: "bg-secondary text-white", // Secondary action button.
    danger: "bg-danger text-white", // Danger button (e.g., delete actions).
    dark: "bg-white  text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-between", // Dark-themed button.
  };

  // Map for border-based styles (used when ghost is true).
  const borderClass = {
    default:
      "border-gray-400 border-2 text-white hover:border-blue-400 hover:text-blue-400", // Neutral ghost style.
    primary: "border-blue-400 border-2 text-blue-400 hover:border-blue-500", // Ghost style for primary action.
    secondary: "border-secondary border-2 text-secondary", // Ghost style for secondary action.
    danger: "bg-danger text-white", // Danger ghost style.
    dark: "bg-white  text-lg bg-opacity-10 hover:bg-opacity-15 text-white justify-between", // Dark ghost style.
  };

  // Map for size-specific padding styles.
  const sizeClass = {
    sm: "px-4 py-4", // Small size padding.
    md: "px-10 py-4", // Medium size padding.
    lg: "px-16 py-5", // Large size padding.
  };
  //
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-auto flex items-center justify-center",
        className,
        sizeClass[size],
        rounded ? "rounded-full" : "rounded-lg",
        ghost ? borderClass[type] : bgClass[type]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
