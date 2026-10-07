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
            onSubmit={(values) => {
                if (values.confirmPassword !== values.password) {
                    console.log("PASSWORD DOESN'T MATCH")
                    return
                }
                console.log(values)
            }}
        >
            <Form className="flex flex-col gap-5.5">
                <div className="flex gap-4">
                    <Input label="First Name *" type="text" name="firstName" placeholder="Emma"/>
                    <Input label="Last Name *" type="text" name="lastName" placeholder="Johnson"/>
                </div>
                <Input label="Email address *" type="email" name="email" placeholder="emma.johnson@"/>
                <Input label="Phone Number *" type="text" name="number" placeholder="+(995) 555 123 456"/>
                <Input label="Password *" type="password" name="password" placeholder="********"/>
                <Input label="Confirm Password *" type="password" name="confirmPassword" placeholder="********"/>
                
                <button type="submit" className="bg-[#2563EB] rounded-lg p-2.75 text-sm font-semibold text-white">Create patient account</button>
            </Form>
        </Formik>
    )
}

export default RegisterForm