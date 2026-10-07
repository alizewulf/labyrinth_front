"use client"
import CareIntroduction from "@/widgets/careintroduction"
import FormIntroduction from "../FormIntroduction/FormIntroduction"
import LoginForm from "@/features/login/"
import RegisterForm from "@/features/register/RegisterForm"

type AuthFormProps = "login" | "register"

function AuthForm({ type }: { type: AuthFormProps }) {
    return (
        <>
            <div className="flex gap-25 justify-center font-jakarta!">
                <CareIntroduction />
                {type === "login" ? (
                    <div className="flex flex-col gap-5.5 min-w-125">
                        <FormIntroduction text={{ header: "Welcome back", subtitle: "Log in to keep your care moving forward" }} />
                        <LoginForm/>
                    </div>
                ) : (
                    <div>
                        <FormIntroduction text={{header: "Create your account", subtitle:"Your health deserves a simpler path."}}/>
                        <RegisterForm/>
                    </div>
                )}
            </div>
        </>
    )
}

export default AuthForm