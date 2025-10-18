import {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title)


    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        changeTitle(itemTitle);
        setEditMode(false)
    };

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.target.value)
    }
    return (
        editMode
            ? <input
                value={itemTitle}
                autoFocus
                onBlur={offEditMode}
                onChange={changeItemTitleHandler}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>

    );
};

