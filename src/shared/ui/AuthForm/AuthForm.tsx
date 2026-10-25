"use client";
import CareIntroduction from "@/widgets/careintroduction";
import FormIntroduction from "../FormIntroduction/FormIntroduction";
import LoginForm from "@/features/login/";
import RegisterForm from "@/features/register/RegisterForm";

type AuthFormProps = "login" | "register";

function AuthForm({ type }: { type: AuthFormProps }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-center lg:items-start font-jakarta! py-6 sm:py-10 px-4 sm:px-6 w-full max-w-6xl mx-auto">
      <div className="w-full lg:w-auto flex justify-center">
        <CareIntroduction />
      </div>
      {type === "login" ? (
        <div className="flex flex-col gap-5.5 w-full max-w-md">
          <FormIntroduction
            message={{
              header: "Welcome back",
              subtitle: "Log in to keep your care moving forward",
            }}
          />
          <LoginForm />
        </div>
      ) : (
        <div className="flex flex-col gap-5.5 w-full max-w-md">
          <FormIntroduction
            message={{
              header: "Create your account",
              subtitle: "Your health deserves a simpler path.",
            }}
          />
          <RegisterForm />
        </div>
      )}
    </div>
  );
}

export default AuthForm;
