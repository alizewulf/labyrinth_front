import { Field } from "formik"

interface InputProps {
    label: string,
    name: string,
    placeholder: string
    type?: "email" | "password" | "text",
    required?: boolean
}

function Input({ label, name, placeholder, type, required }: InputProps) {
    return (
        <div className="flex flex-col font-jakarta gap-2">
            <label htmlFor={name} className="font-semibold text-xs">{label}</label>
            <Field name={name} required={required} className="border-2 border-border px-3.5 rounded-lg h-10" placeholder={placeholder} type={type} />
        </div>
    )
}

export default Input