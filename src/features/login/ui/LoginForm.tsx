import Input from "@/shared/ui/Input/Input"
import { Form, Formik } from "formik"

function LoginForm() {
    return (
        <Formik initialValues={{
            email: "",
            password: ""
        }}
            onSubmit={(value) => {
                console.log(value)
            }}
        >
            <Form className="flex flex-col gap-5.5">
                <Input label="Email address" name="email" type="email" placeholder="emma.johnson@gmail.com"/>
                <Input label="Password password" type="password" name="password" placeholder="********"/>
                <button type="submit" className="bg-[#2563EB] rounded-lg p-2.75 text-sm font-semibold text-white">Log in</button>
            </Form>
        </Formik>
    )
}

export default LoginForm