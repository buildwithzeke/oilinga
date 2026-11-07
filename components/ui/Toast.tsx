"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Notify = (message: string) => void;

const ToastContext = createContext<Notify>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState("");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const notify = useCallback<Notify>((next) => {
        setMessage(next);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setMessage(""), 2400);
    }, []);

    useEffect(() => {
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    return (
        <ToastContext.Provider value={notify}>
            {children}
            <div
                className={cn("oi-toast", message && "is-visible")}
                role="status"
                aria-live="polite"
            >
                {message}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
