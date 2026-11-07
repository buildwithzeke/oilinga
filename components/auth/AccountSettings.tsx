"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAuth, type AuthUser } from "./AuthProvider";
import { AccountSidebarNav } from "./AccountSidebarNav";

const ACCOUNTS_KEY = "oilinga.accounts";
const SESSION_KEY = "oilinga.session";

interface StoredAccount extends AuthUser {
    password: string;
}

function readStoredAccounts(): StoredAccount[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(ACCOUNTS_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as StoredAccount[]) : [];
    } catch {
        return [];
    }
}

function writeStoredAccounts(accounts: StoredAccount[]): void {
    try {
        window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
        // Storage may be unavailable.
    }
}

function initialsFor(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] ?? "O").concat(parts[1]?.[0] ?? "").toUpperCase();
}

export function AccountSettings() {
    const router = useRouter();
    const { user, ready } = useAuth();
    const notify = useToast();

    const [name, setName] = useState("");
    const [profileError, setProfileError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const initialized = useRef(false);

    useEffect(() => {
        if (ready && !user) {
            router.replace("/login?next=/account/settings");
        }
    }, [ready, user, router]);

    useEffect(() => {
        if (user && !initialized.current) {
            setName(user.name);
            initialized.current = true;
        }
    }, [user]);

    if (!ready) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Loading…</div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Redirecting you to sign in…</div>
            </section>
        );
    }

    function handleProfileSave(e: React.FormEvent) {
        e.preventDefault();
        setProfileError("");

        if (!name.trim()) {
            setProfileError("Name cannot be empty.");
            return;
        }

        const accounts = readStoredAccounts();
        const idx = accounts.findIndex((a) => a.email === user!.email);
        const newInitials = initialsFor(name);

        if (idx !== -1) {
            accounts[idx] = {
                ...accounts[idx],
                name: name.trim(),
                initials: newInitials,
            };
            writeStoredAccounts(accounts);
        }

        // Update session
        const updatedUser: AuthUser = {
            ...user!,
            name: name.trim(),
            initials: newInitials,
        };
        try {
            window.localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
        } catch {
            // Ignore storage errors.
        }

        notify("Profile saved");
    }

    function handlePasswordChange(e: React.FormEvent) {
        e.preventDefault();
        setPasswordError("");

        const accounts = readStoredAccounts();

        // Demo account special case
        const DEMO_EMAIL = "demo@oilinga.com";
        const DEMO_PASSWORD = "oilinga";

        let storedPassword: string | undefined;

        if (user!.email === DEMO_EMAIL) {
            storedPassword = DEMO_PASSWORD;
        } else {
            const account = accounts.find((a) => a.email === user!.email);
            storedPassword = account?.password;
        }

        if (!storedPassword || currentPassword !== storedPassword) {
            setPasswordError("Current password is incorrect.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        const idx = accounts.findIndex((a) => a.email === user!.email);
        if (idx !== -1) {
            accounts[idx] = { ...accounts[idx], password: newPassword };
            writeStoredAccounts(accounts);
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        notify("Password updated");
    }

    return (
        <section className="oi-view oi-container" aria-labelledby="settings-title">
            <div className="oi-dashboard">
                <AccountSidebarNav />

                <div className="oi-dashboard__content">
                    <h1 id="settings-title" className="oi-page-title">
                        Account settings
                    </h1>

                    {/* Profile section */}
                    <form
                        className="oi-form-section"
                        onSubmit={handleProfileSave}
                        aria-label="Profile settings"
                    >
                        <h2 className="oi-section-title">Profile</h2>

                        <div className="oi-form-group">
                            <label htmlFor="settings-name" className="oi-form-label">
                                Full name
                            </label>
                            <input
                                id="settings-name"
                                type="text"
                                className="oi-form-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>

                        <div className="oi-form-group">
                            <label htmlFor="settings-email" className="oi-form-label">
                                Email address
                            </label>
                            <input
                                id="settings-email"
                                type="email"
                                className="oi-form-input"
                                value={user.email}
                                readOnly
                                aria-readonly="true"
                            />
                        </div>

                        {profileError && (
                            <p className="oi-form-error" role="alert">
                                {profileError}
                            </p>
                        )}

                        <Button type="submit" variant="primary" size="sm">
                            Save profile
                        </Button>
                    </form>

                    {/* Password section */}
                    <form
                        className="oi-form-section"
                        onSubmit={handlePasswordChange}
                        aria-label="Change password"
                    >
                        <h2 className="oi-section-title">Change password</h2>

                        <div className="oi-form-group">
                            <label htmlFor="settings-current-pw" className="oi-form-label">
                                Current password
                            </label>
                            <input
                                id="settings-current-pw"
                                type="password"
                                className="oi-form-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="oi-form-group">
                            <label htmlFor="settings-new-pw" className="oi-form-label">
                                New password
                            </label>
                            <input
                                id="settings-new-pw"
                                type="password"
                                className="oi-form-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                                minLength={8}
                            />
                        </div>

                        <div className="oi-form-group">
                            <label htmlFor="settings-confirm-pw" className="oi-form-label">
                                Confirm new password
                            </label>
                            <input
                                id="settings-confirm-pw"
                                type="password"
                                className="oi-form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>

                        {passwordError && (
                            <p className="oi-form-error" role="alert">
                                {passwordError}
                            </p>
                        )}

                        <Button type="submit" variant="outline" size="sm">
                            Update password
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
