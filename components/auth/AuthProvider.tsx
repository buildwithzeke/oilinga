"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export interface AuthUser {
    name: string;
    email: string;
    initials: string;
    joined: string;
}

interface StoredAccount extends AuthUser {
    password: string;
}

export type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthContextValue {
    user: AuthUser | null;
    ready: boolean;
    signIn: (email: string, password: string) => AuthResult;
    signUp: (name: string, email: string, password: string) => AuthResult;
    signOut: () => void;
}

const ACCOUNTS_KEY = "oilinga.accounts";
const SESSION_KEY = "oilinga.session";
const DEMO_ACCOUNT: StoredAccount = {
    name: "Amina Okafor",
    email: "demo@oilinga.com",
    password: "oilinga",
    initials: "AO",
    joined: "2026-01-12",
};

const AuthContext = createContext<AuthContextValue | null>(null);

function initialsFor(name: string) {
    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return (parts[0]?.[0] ?? "O").concat(parts[1]?.[0] ?? "").toUpperCase();
}

function readAccounts(): StoredAccount[] {
    try {
        const raw = window.localStorage.getItem(ACCOUNTS_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as StoredAccount[]) : [];
    } catch {
        return [];
    }
}

function writeAccounts(accounts: StoredAccount[]) {
    try {
        window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
        // Demo storage can be unavailable in private browsing; the session still works.
    }
}

function readSession(): AuthUser | null {
    try {
        const raw = window.localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as AuthUser;
        if (!parsed?.email || !parsed?.name) return null;
        return parsed;
    } catch {
        return null;
    }
}

function persist(user: AuthUser) {
    try {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        document.cookie = `oilinga_session=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    } catch {
        // Ignore storage failures.
    }
}

function clearSession() {
    try {
        window.localStorage.removeItem(SESSION_KEY);
        document.cookie = "oilinga_session=; path=/; max-age=0; SameSite=Lax";
    } catch {
        // Ignore storage failures.
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setUser(readSession());
        setReady(true);
    }, []);

    const signIn = useCallback<AuthContextValue["signIn"]>((email, password) => {
        const normalized = email.trim().toLowerCase();
        const accounts = readAccounts();
        const record =
            accounts.find((account) => account.email === normalized) ??
            (normalized === DEMO_ACCOUNT.email ? DEMO_ACCOUNT : undefined);

        if (!record) {
            return {
                ok: false,
                error: "No account found for that email. Try the demo account or create one.",
            };
        }

        if (record.password !== password) {
            return { ok: false, error: "That password doesn’t match. Please try again." };
        }

        const session: AuthUser = {
            name: record.name,
            email: record.email,
            initials: record.initials || initialsFor(record.name),
            joined: record.joined,
        };

        setUser(session);
        persist(session);
        return { ok: true };
    }, []);

    const signUp = useCallback<AuthContextValue["signUp"]>((name, email, password) => {
        const normalized = email.trim().toLowerCase();
        const accounts = readAccounts();

        if (
            normalized === DEMO_ACCOUNT.email ||
            accounts.some((account) => account.email === normalized)
        ) {
            return {
                ok: false,
                error: "An account with that email already exists. Try logging in instead.",
            };
        }

        const session: AuthUser = {
            name: name.trim(),
            email: normalized,
            initials: initialsFor(name),
            joined: new Date().toISOString().slice(0, 10),
        };

        writeAccounts([...accounts, { ...session, password }]);
        setUser(session);
        persist(session);
        return { ok: true };
    }, []);

    const signOut = useCallback(() => {
        setUser(null);
        clearSession();
    }, []);

    const value = useMemo(
        () => ({ user, ready, signIn, signUp, signOut }),
        [user, ready, signIn, signUp, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
}
