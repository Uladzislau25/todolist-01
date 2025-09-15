import {filterType, Task} from "./App";
import {Button} from "./button.tsx";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
    changeFilter: (filter: filterType) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter}: Props) => {
    const taskList = tasks.length === 0
    ? <span>is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={'x'} onClickFunction={()=>{deleteTask(task.id)}}/>
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
                <Button onClickFunction={()=>(changeFilter('all'))} title={"All"}/>
                <Button onClickFunction={()=>(changeFilter('active'))} title={"Active"}/>
                <Button onClickFunction={()=>(changeFilter('completed'))} title={"Completed"}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

