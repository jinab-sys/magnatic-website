import { RegisterForm } from "@/components/blocks/register-form"

export default function RegisterPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-md">
                <RegisterForm showLogo />
            </div>
        </main>
    )
}
