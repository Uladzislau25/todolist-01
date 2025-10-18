type Props = {
    title: string
    onClickFunction?: () => void
    className?: string
    disabled?: boolean
}
export const Button = (({title, onClickFunction, className, disabled}: Props) => {
    return (
            <button
                disabled={disabled}
                className={className} onClick={onClickFunction}>{title}</button>
    )
});
