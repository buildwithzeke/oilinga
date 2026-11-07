import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { first, type QueryValue } from "@/lib/search-params";

export const metadata: Metadata = {
    title: "Log in",
    robots: { index: false, follow: false },
};

interface LoginPageProps {
    searchParams: Promise<Record<string, QueryValue>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams;
    const next = first(params.next);

    return <AuthForm mode="login" next={next} />;
}
