"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "./AuthProvider";

export interface AuthFormProps {
    mode: "login" | "signup";
    next?: string;
}

interface Values {
    name: string;
    email: string;
    password: string;
    confirm: string;
}

function safeNext(next?: string) {
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
    return "/account";
}

export function AuthForm({ mode, next }: AuthFormProps) {
    const router = useRouter();
    const { signIn, signUp } = useAuth();
    const [values, setValues] = useState<Values>({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof Values | "terms", string>>>({});
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [terms, setTerms] = useState(false);
    const [busy, setBusy] = useState(false);

    const isSignup = mode === "signup";
    const target = safeNext(next);

    function update(field: keyof Values, value: string) {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
        setFormError("");
    }

    function validate() {
        const nextErrors: Partial<Record<keyof Values | "terms", string>> = {};
        const email = values.email.trim();

        if (isSignup && values.name.trim().length < 2) {
            nextErrors.name = "Tell us the name you want on your account.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (values.password.length < 6) {
            nextErrors.password = "Use at least 6 characters.";
        }

        if (isSignup && values.confirm !== values.password) {
            nextErrors.confirm = "The passwords don’t match yet.";
        }

        if (isSignup && !terms) {
            nextErrors.terms = "Please accept the marketplace terms to continue.";
        }

        return nextErrors;
    }

    function fillDemo() {
        setValues({ name: "", email: "demo@oilinga.com", password: "oilinga", confirm: "" });
        setErrors({});
        setFormError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setBusy(true);
        const result = isSignup
            ? signUp(values.name, values.email, values.password)
            : signIn(values.email, values.password);

        if (!result.ok) {
            setFormError(result.error);
            setBusy(false);
            return;
        }

        router.push(target);
    }

    const switchHref = isSignup
        ? { pathname: "/auth/login", query: next ? { next } : undefined }
        : { pathname: "/auth/signup", query: next ? { next } : undefined };

    return (
        <section className="oi-auth oi-view">
            <div className="oi-container oi-auth__grid">
                <aside className="oi-auth__aside">
                    <Logo variant="light" size="lg" />
                    <span className="oi-eyebrow">Buy · Sell · Grow</span>
                    <h1>Good oil. Good business. One marketplace.</h1>
                    <p>
                        Join buyers and producers across Africa who use Oilinga to trade quality
                        palm oil and groundnut oil with confidence.
                    </p>
                    <ul className="oi-auth__list">
                        <li>
                            <Icon name="check" size={15} />
                            Verified sellers across Africa
                        </li>
                        <li>
                            <Icon name="check" size={15} />
                            Secure checkout on every order
                        </li>
                        <li>
                            <Icon name="check" size={15} />
                            Track your orders from press to doorstep
                        </li>
                    </ul>
                    <blockquote className="oi-auth__quote">
                        “Oilinga helped our co-op reach buyers in three new cities in our first
                        season.”
                        <cite>Green Grove Co-op · Cross River</cite>
                    </blockquote>
                </aside>

                <div className="oi-auth__panel">
                    <div className="oi-auth__head">
                        <span className="oi-eyebrow oi-eyebrow--green">
                            {isSignup ? "Join the marketplace" : "Welcome back"}
                        </span>
                        <h2>{isSignup ? "Create your account" : "Log in to Oilinga"}</h2>
                        <p>
                            {isSignup
                                ? "Save your details, follow sellers and check out faster."
                                : "Pick up where you left off with your saved sellers and orders."}
                        </p>
                    </div>

                    <form className="oi-auth__form" onSubmit={handleSubmit} noValidate>
                        {formError && (
                            <p className="oi-auth__error" role="alert">
                                {formError}
                            </p>
                        )}

                        {isSignup && (
                            <div className="oi-field">
                                <label className="oi-field__label" htmlFor="auth-name">
                                    Full name
                                </label>
                                <input
                                    id="auth-name"
                                    className="oi-input"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Amina Okafor"
                                    value={values.name}
                                    onChange={(event) => update("name", event.target.value)}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "auth-name-error" : undefined}
                                />
                                {errors.name && (
                                    <small className="oi-field__error" id="auth-name-error">
                                        {errors.name}
                                    </small>
                                )}
                            </div>
                        )}

                        <div className="oi-field">
                            <label className="oi-field__label" htmlFor="auth-email">
                                Email address
                            </label>
                            <input
                                id="auth-email"
                                className="oi-input"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={values.email}
                                onChange={(event) => update("email", event.target.value)}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "auth-email-error" : undefined}
                            />
                            {errors.email && (
                                <small className="oi-field__error" id="auth-email-error">
                                    {errors.email}
                                </small>
                            )}
                        </div>

                        <div className="oi-field">
                            <label className="oi-field__label" htmlFor="auth-password">
                                Password
                            </label>
                            <div className="oi-input-wrap">
                                <input
                                    id="auth-password"
                                    className="oi-input"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete={isSignup ? "new-password" : "current-password"}
                                    placeholder="At least 6 characters"
                                    value={values.password}
                                    onChange={(event) => update("password", event.target.value)}
                                    aria-invalid={Boolean(errors.password)}
                                    aria-describedby={
                                        errors.password ? "auth-password-error" : undefined
                                    }
                                />
                                <button
                                    type="button"
                                    className="oi-input-action"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
                                </button>
                            </div>
                            {errors.password && (
                                <small className="oi-field__error" id="auth-password-error">
                                    {errors.password}
                                </small>
                            )}
                        </div>

                        {isSignup && (
                            <>
                                <div className="oi-field">
                                    <label className="oi-field__label" htmlFor="auth-confirm">
                                        Confirm password
                                    </label>
                                    <input
                                        id="auth-confirm"
                                        className="oi-input"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Repeat your password"
                                        value={values.confirm}
                                        onChange={(event) => update("confirm", event.target.value)}
                                        aria-invalid={Boolean(errors.confirm)}
                                        aria-describedby={
                                            errors.confirm ? "auth-confirm-error" : undefined
                                        }
                                    />
                                    {errors.confirm && (
                                        <small className="oi-field__error" id="auth-confirm-error">
                                            {errors.confirm}
                                        </small>
                                    )}
                                </div>

                                <label className="oi-check">
                                    <input
                                        type="checkbox"
                                        checked={terms}
                                        onChange={(event) => {
                                            setTerms(event.target.checked);
                                            setErrors((current) => ({
                                                ...current,
                                                terms: undefined,
                                            }));
                                        }}
                                        aria-invalid={Boolean(errors.terms)}
                                    />
                                    <span>
                                        I agree to the Oilinga marketplace terms for buyers and
                                        sellers.
                                    </span>
                                </label>
                                {errors.terms && <small className="oi-field__error">{errors.terms}</small>}
                            </>
                        )}

                        <Button type="submit" size="lg" block disabled={busy}>
                            {isSignup ? "Create account" : "Log in"}
                            <Icon name="arrow-right" size={16} />
                        </Button>
                    </form>

                    <p className="oi-auth__switch">
                        {isSignup ? "Already have an account?" : "New to Oilinga?"}{" "}
                        <Link href={switchHref}>
                            {isSignup ? "Log in instead" : "Create an account"}
                        </Link>
                    </p>

                    <div className="oi-auth__demo">
                        <div>
                            <b>Preview authentication</b>
                            <p>
                                This phase stores accounts in your browser. Log in with{" "}
                                <code>demo@oilinga.com</code> and <code>oilinga</code>, or create
                                an account.
                            </p>
                        </div>
                        {!isSignup && (
                            <button
                                type="button"
                                className="oi-auth__demo-btn"
                                onClick={fillDemo}
                            >
                                Use demo account
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
