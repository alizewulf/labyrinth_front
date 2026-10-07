
import Input from "@/shared/ui/Input/Input"
import { Form, Formik } from "formik"

function RegisterForm() {
    return (
        <Formik initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            password: "",
            confirmPassword: ""
        }}
            validate={(values) => {
                const errors: {
                    firstName?: string,
                    lastName?: string,
                    email?: string,
                    number?: string,
                    password?: string,
                    confirmPassword?: string
                } = {}

                if (!values.firstName.trim()) {
                    errors.firstName = "First name is required."
                }

                if (!values.lastName.trim()) {
                    errors.lastName = "Last name is required."
                }

                if (!values.email.trim()) {
                    errors.email = "Email address is required."
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                    errors.email = "Enter a valid email address, e.g. name@example.com."
                }

                if (!values.number.trim()) {
                    errors.number = "Phone number is required."
                } else if (!/^\d{9}$/.test(values.number)) {
                    errors.number = "Enter a valid phone number."
                }

                if (!values.password) {
                    errors.password = "Password is required."
                }

                if (!values.confirmPassword) {
                    errors.confirmPassword = "Please confirm your password."
                } else if (values.confirmPassword !== values.password) {
                    errors.confirmPassword = "Passwords do not match."
                }

                return errors
            }}
            onSubmit={(values) => {
                const { confirmPassword, ...userData } = values
                console.log(userData)
            }}
        >
            <Form className="flex flex-col gap-5.5">
                <div className="flex gap-4">
                    <Input label="First Name *" type="text" name="firstName" placeholder="Emma"/>
                    <Input label="Last Name *" type="text" name="lastName" placeholder="Johnson"/>
                </div>

                <Input label="Email address *" type="email" name="email" placeholder="emma.johnson@"/>

                <Input label="Phone Number *" type="tel" name="number" placeholder="555 123 456" prefix="(995)"/>

                <Input label="Password *" type="password" name="password" placeholder="********"/>

                <Input label="Confirm Password *" type="password" name="confirmPassword" placeholder="********"/>

                <button type="submit" className="bg-[#2563EB] rounded-lg p-2.75 text-sm font-semibold text-white">Create patient account</button>
            </Form>
        </Formik>
    )
}

export default RegisterForm
