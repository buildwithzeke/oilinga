import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { first, type QueryValue } from "@/lib/search-params";

export const metadata: Metadata = {
    title: "Create your account",
    robots: { index: false, follow: false },
};

interface SignupPageProps {
    searchParams: Promise<Record<string, QueryValue>>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
    const params = await searchParams;
    const next = first(params.next);

    return <AuthForm mode="signup" next={next} />;
}
