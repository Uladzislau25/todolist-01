import {Task} from "./App";
import {Button} from "./button.tsx";

type Props = {
    title: string
    tasks: Task[]
    date?: string
}

export const TodolistItem = ({title, tasks, date}: Props) => {
    const taskList = tasks.length === 0
    ? <span>is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={'x'} onClickFunction={()=>{}}/>
                    </li>

                )
            })}
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {taskList}
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

