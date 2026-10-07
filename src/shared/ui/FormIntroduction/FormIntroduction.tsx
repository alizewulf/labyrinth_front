interface FormIntroductionProps {
    text: {
        header: string,
        subtitle: string
    }
}

function FormIntroduction({ text }: FormIntroductionProps) {
    return (
        <div className="flex flex-col gap-2 font-jakarta">
            <h1 className="text-3xl font-bold text-text">{text.header}</h1>
            <p className="text-sm text-text-secondary">{text.subtitle}</p>
        </div>
    )
}

export default FormIntroduction