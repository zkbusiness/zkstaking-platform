import React, { useEffect, useRef, useState } from "react";
import { cn, formatNumber } from "@utils/index";

interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  format?: string;
}

function calculateDuration(start: number, end: number): number {
  const difference = Math.abs(end - start);
  if (difference < 100) return 1000;
  if (difference < 1000) return 1500;
  if (difference < 10000) return 2000;
  if (difference < 100000) return 2500;
  return 3000;
}

export function CountUp({
  end,
  start = 0,
  duration,
  delay = 0,
  prefix = "",
  suffix = "",
  format = "0.[00]a",
  className,
  ...props
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const animationDuration = duration ?? calculateDuration(start, end);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + animationDuration;
      const difference = end - start;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / animationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentCount = Math.round(start + easedProgress * difference);

        if (currentCount !== countRef.current) {
          countRef.current = currentCount;
          setCount(currentCount);
        }

        if (now < endTime) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [end, start, animationDuration, delay]);

  return (
    <span className={cn("inline-flex items-center", className)} {...props}>
      {prefix && <span className="mr-1">{prefix}</span>}
      <span>{formatNumber(count, format)}</span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
}
