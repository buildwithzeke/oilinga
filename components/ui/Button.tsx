"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "gold" | "danger" | "outline" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
}

export function Button({
    variant = "primary",
    size = "md",
    block = false,
    className,
    type = "button",
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "oi-btn",
                `oi-btn--${variant}`,
                size !== "md" && `oi-btn--${size}`,
                block && "oi-btn--block",
                className,
            )}
            {...rest}
        />
    );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    children: ReactNode;
}

export function IconButton({ label, className, type = "button", children, ...rest }: IconButtonProps) {
    return (
        <button
            type={type}
            className={cn("oi-icon-btn", className)}
            aria-label={label}
            title={label}
            {...rest}
        >
            {children}
        </button>
    );
}
