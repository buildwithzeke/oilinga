"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "./AuthProvider";

export function AccountView() {
    const router = useRouter();
    const { user, ready, signOut } = useAuth();
    const signingOut = useRef(false);

    useEffect(() => {
        if (ready && !user && !signingOut.current) {
            router.replace("/login?next=/account");
        }
    }, [ready, user, router]);

    if (!ready) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Loading your account…</div>
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

    const joined = new Date(`${user.joined}T00:00:00`).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
    });
    const firstName = user.name.split(/\s+/)[0];

    function handleSignOut() {
        signingOut.current = true;
        signOut();
        router.push("/");
    }

    return (
        <section className="oi-account oi-view oi-container" aria-labelledby="account-title">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your account" }]} />

            <div className="oi-account__hero">
                <span className="oi-account__avatar" aria-hidden="true">
                    {user.initials}
                </span>
                <div className="oi-account__intro">
                    <span className="oi-eyebrow oi-eyebrow--green">Your account</span>
                    <h1 id="account-title">Welcome back, {firstName}</h1>
                    <p>
                        {user.email} <span aria-hidden="true">·</span> Member since {joined}
                    </p>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                    <Icon name="logout" size={16} />
                    Log out
                </Button>
            </div>

            <div className="oi-account__stats">
                <article className="oi-account__stat">
                    <small>Orders placed</small>
                    <strong>0</strong>
                    <span>Your order history will appear here.</span>
                </article>
                <article className="oi-account__stat">
                    <small>Saved products</small>
                    <strong>0</strong>
                    <span>Tap the heart on a product to save it.</span>
                </article>
                <article className="oi-account__stat">
                    <small>Shops followed</small>
                    <strong>0</strong>
                    <span>Follow a shop to see new pressing runs.</span>
                </article>
            </div>

            <div className="oi-account__grid">
                <article className="oi-account__card">
                    <span className="oi-account__card-icon">
                        <Icon name="bag" size={20} />
                    </span>
                    <h2>Start your first order</h2>
                    <p>
                        Browse fresh palm oil, groundnut oil and wholesale sizes from verified
                        sellers.
                    </p>
                    <ButtonLink href="/marketplace" variant="primary" size="sm">
                        Explore marketplace
                        <Icon name="arrow-right" size={14} />
                    </ButtonLink>
                </article>

                <article className="oi-account__card">
                    <span className="oi-account__card-icon">
                        <Icon name="store" size={20} />
                    </span>
                    <h2>Discover shops</h2>
                    <p>
                        Meet the producers and co-operatives behind every bottle in the shop
                        directory.
                    </p>
                    <ButtonLink href="/shops" variant="outline" size="sm">
                        Browse shops
                        <Icon name="arrow-right" size={14} />
                    </ButtonLink>
                </article>

                <article className="oi-account__card">
                    <span className="oi-account__card-icon">
                        <Icon name="sparkle" size={20} />
                    </span>
                    <h2>Sell on Oilinga</h2>
                    <p>
                        Open a storefront, list your pressing runs and reach buyers across Africa.
                    </p>
                    <ButtonLink href="/seller" variant="outline" size="sm">
                        Visit seller portal
                        <Icon name="arrow-right" size={14} />
                    </ButtonLink>
                </article>
            </div>

            <p className="oi-account__note">
                Preview authentication: your account is stored in this browser for Phase 2.
                Connecting a production identity provider is a later phase.
            </p>
        </section>
    );
}
