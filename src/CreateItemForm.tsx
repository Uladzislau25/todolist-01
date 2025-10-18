import {Button} from "./button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type PropsType = {
    createItem: (newItemTitle: string) => void
}


export const CreateItemForm = ({createItem}: PropsType) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState(false)


    const createItemHandler = () => {
        const trimItemTitle = itemTitle.trim()
        if (trimItemTitle !== '') {
            createItem(itemTitle);
            setItemTitle("")
        } else {
            setError(true);
        }
    }


    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(true)
        setItemTitle(e.target.value)
    }
    const onKeyDownCreateItemHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && itemTitle.length >= 3 && itemTitle.length < 10) {
            createItemHandler();
            setItemTitle("")
        }
    }



    return (
        <div>
            <input
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={onKeyDownCreateItemHandler}
                className={error? 'error' : ''}
            />
            <Button
                disabled= {itemTitle.length < 3 || itemTitle.length > 10}
                title={"+"}
                onClickFunction={createItemHandler}/>
            {!error && itemTitle.length < 3 && <div>title most be more than 3 chartes</div>}
            {!error && itemTitle.length >= 3 && itemTitle.length <10 && <div>title must be less then</div>}
            {itemTitle.length >= 10 && <div style={{color: "red"}}>max title length is 10 chartes</div>}
            {error && <div style={{color: "red"}}>Title is required</div>}
        </div>
    );
};

