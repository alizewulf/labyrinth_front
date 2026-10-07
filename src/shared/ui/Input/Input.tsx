import { useField } from "formik"

interface InputProps {
    label: string,
    name: string,
    placeholder: string
    type?: "email" | "password" | "text" | "tel",
    required?: boolean
    prefix?: string
}

function Input({ label, name, placeholder, type, required, prefix }: InputProps) {
    const [field, meta] = useField(name)

    const hasError = meta.touched && meta.error
    const isValid = meta.touched && !meta.error && field.value

    return (
        <div className="flex flex-col font-jakarta gap-2">
            <label htmlFor={name} className="font-semibold text-xs">{label}</label>

            <div className={`flex border-2 rounded-lg h-10
                ${hasError
                    ? "border-red-500"
                    : isValid && type === "tel"
                        ? "border-[#16A34A]"
                        : "border-border"
                }`}
            >
                {prefix && (
                    <span className="flex items-center pl-3.5 text-sm">{prefix}</span>
                )}

                <input {...field} id={name} required={required} className="w-full px-3.5 rounded-lg outline-none" placeholder={placeholder} type={type}
                />
            </div>

            {hasError && (
                <span className="text-xs text-red-500">{meta.error}</span>
            )}

            {isValid && type === "tel" && (
                <span className="text-xs text-[#16A34A]">Valid phone number</span>
            )}
        </div>
    )
}

export default Input
