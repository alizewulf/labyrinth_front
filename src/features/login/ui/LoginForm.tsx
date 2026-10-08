"use client"
import { getCurrentUser, loginUser } from "@/shared/api/auth"
import Input from "@/shared/ui/Input/Input"
import { Form, Formik } from "formik"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/authSlice"

function LoginForm() {
    const dispatch = useAppDispatch()

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validate={(values) => {
                const errors: {
                    email?: string,
                    password?: string,
                } = {}

                if (!values.email.trim()) {
                    errors.email = "Email address is required."
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                    errors.email = "Enter a valid email address, e.g. name@example.com."
                }

                if (!values.password) {
                    errors.password = "Password is required."
                } else if (values.password.length < 8) {
                    errors.password = "Password must be at least 8 characters."
                }

                return errors
            }}
            onSubmit={async (values) => {
                try {
                    const result = await loginUser({
                        email: values.email,
                        password: values.password
                    })

                    localStorage.setItem("accessToken", result.accessToken)

                    const user = await getCurrentUser()

                    dispatch(setUser(user))

                    console.log(user)
                } catch (error) {
                    console.log(error)
                }
            }}
        >
            <Form className="flex flex-col gap-5.5">
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="emma.johnson@gmail.com"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="********"
                />

                <button
                    type="submit"
                    className="bg-[#2563EB] rounded-lg p-2.75 text-sm font-semibold text-white"
                >
                    Log in
                </button>
            </Form>
        </Formik>
    )
}

export default LoginForm