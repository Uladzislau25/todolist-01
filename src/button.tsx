type Props = {
    title: string
    onClickFunction?: () => void
    className?: string
}
export const Button = (({title, onClickFunction, className}: Props) => {
    return (
            <button className={className} onClick={onClickFunction}>{title}</button>
    )
});
