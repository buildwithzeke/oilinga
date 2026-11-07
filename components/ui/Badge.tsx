import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone =
    | "gold"
    | "green"
    | "neutral"
    | "red"
    | "blue"
    | "pending"
    | "shipped"
    | "delivered";

export interface BadgeProps {
    tone?: BadgeTone;
    className?: string;
    children: ReactNode;
}

export function Badge({ tone = "gold", className, children }: BadgeProps) {
    return <span className={cn("oi-badge", `oi-badge--${tone}`, className)}>{children}</span>;
}
