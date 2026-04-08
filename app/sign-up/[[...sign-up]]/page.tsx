import { SignUp } from '@clerk/nextjs'
import { ShaderAnimation } from "@/components/ui/shader-lines"
import { Navbar } from "@/components/blocks/navbar"

export default function SignUpPage() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
            <div className="fixed inset-0 z-0 bg-black pointer-events-none">
                <ShaderAnimation />
            </div>
            <Navbar />
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full mt-10">
                <SignUp />
            </div>
        </main>
    )
}
