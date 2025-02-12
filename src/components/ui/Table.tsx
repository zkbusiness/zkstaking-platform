import { cn } from "@utils/index";
import type React from "react";

export function Table({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <table className={cn(className, "w-full border-collapse bg-zinc-800 text-zinc-100")}>{children}</table>;
}

export function TableHeader({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <thead className={cn(className, "bg-zinc-700")}>{children}</thead>;
}

export function TableBody({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <tbody>{children}</tbody>;
}

export function TableRow({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <tr className={cn(className, "border-b border-zinc-700 transition-colors")}>{children}</tr>;
}

export function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <th className={cn(className, "px-4 py-2 font-semibold text-zinc-300")}>{children}</th>;
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
    return <td className={cn(className, "px-4 py-2")}>{children}</td>;
}

