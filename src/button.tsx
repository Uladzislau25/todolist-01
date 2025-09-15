type Props = {
    title: string
    onClickFunction?: () => void
}
export const Button = (({title, onClickFunction}: Props) => {
    return (
            <button onClick={onClickFunction}>{title}</button>
    )
});
