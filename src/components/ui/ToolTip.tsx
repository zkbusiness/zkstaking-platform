"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { createPopper, type Instance as PopperInstance } from "@popperjs/core";
import { cn } from "@utils/index";

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    disabled?: boolean;
}

export function Tooltip({ children, content, position = "top", className, disabled = false }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const popperInstanceRef = useRef<PopperInstance | null>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current && arrowRef.current) {
            popperInstanceRef.current = createPopper(triggerRef.current, tooltipRef.current, {
                placement: position,
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 8],
                        },
                    },
                    {
                        name: "arrow",
                        options: {
                            element: arrowRef.current,
                        },
                    },
                ],
            });
        }

        return () => {
            if (popperInstanceRef.current) {
                popperInstanceRef.current.destroy();
                popperInstanceRef.current = null;
            }
        };
    }, [isVisible, position]);

    const showTooltip = () => setIsVisible(!disabled);
    const hideTooltip = () => setIsVisible(false);

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                aria-describedby="tooltip"
            >
                {children}
            </div>
            {isVisible && (
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    id="tooltip"
                    className={cn(
                        "z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-gray-700 relative",
                        className,
                    )}
                >
                    {content}
                    <div
                        ref={arrowRef}
                        className=" w-4 h-4"
                        data-popper-arrow
                    >
                        <div className="rotate-45 w-3 h-3 bg-gray-900 dark:bg-gray-700" >

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
