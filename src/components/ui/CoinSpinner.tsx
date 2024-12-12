import { cn } from "@utils/index";

interface Prop {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isSilver?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: "w-11",
  sm: "w-16",
  md: "w-24",
  lg: "w-32",
  xl: "w-40",
};

const CoinSpinner = ({
  size = "md",
  isSilver = false,
  className = "",
}: Prop) => {
  const getColor = () =>
    isSilver
      ? {
          filter:
            "grayscale(100%) brightness(90%) sepia(70%) hue-rotate(180deg)",
        }
      : {};

  return (
    <div
      className={cn(
        "spinningasset coin w-fit h-96 flex items-center text-left",
        className
      )}
    >
      <div className={cn("aspect-square", sizeClasses[size])}>
        <div style={getColor()}></div>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <i style={getColor()}></i>
        <em style={getColor()}></em>
        <em style={getColor()}></em>
        <div style={getColor()}></div>
      </div>
    </div>
  );
};

export default CoinSpinner;
