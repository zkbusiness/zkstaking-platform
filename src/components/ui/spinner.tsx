import React from "react";
import { cn } from "@utils/index";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  variant?: "dots" | "ring" | "bars";
}

export function Spinner({
  size = "md",
  color = "currentColor",
  className,
  variant = "dots",
  ...props
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-16",
    md: "h-8 w-24",
    lg: "h-12 w-36",
  };

  const largeSizeClasses = {
    sm: "h-15 w-48",
    md: "h-24 w-72",
    lg: "h-36 w-108",
  };

  const variants = {
    dots: (
      <svg
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="9" fillOpacity="0.3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    ),
    ring: (
      <svg
        className={cn("animate-spin", largeSizeClasses[size], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ),
    bars: (
      <svg
        className={cn("animate-spin", largeSizeClasses[size], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="0 0 24 24"
        {...props}
      >
        <rect
          className="opacity-20"
          x="11"
          y="1"
          width="2"
          height="22"
          rx="1"
        />
        <rect className="opacity-40" x="11" y="1" width="2" height="22" rx="1">
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1.2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          className="opacity-60"
          x="18.364"
          y="3.636"
          width="2"
          height="18.728"
          rx="1"
          transform="rotate(45 18.364 3.636)"
        />
        <rect
          className="opacity-80"
          x="22"
          y="11"
          width="2"
          height="22"
          rx="1"
          transform="rotate(90 22 11)"
        />
        <rect
          x="20.364"
          y="18.364"
          width="2"
          height="18.728"
          rx="1"
          transform="rotate(135 20.364 18.364)"
        />
      </svg>
    ),
  };

  return variants[variant];
}
