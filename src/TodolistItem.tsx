import {filterType, Task} from "./App";
import {Button} from "./button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";


type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: filterType

    deleteTask: (taskId: string) => void
    addTask: (task: string) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task['isDone']) => void
    changeFilter: (filter: filterType) => void
}



export const TodolistItem = ({title, tasks, filter, date, deleteTask, addTask, changeTaskStatus, changeFilter}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addTaskHandler = () => {
        const trimNewTaskTitle = newTaskTitle.trim()
         if (trimNewTaskTitle !== '') {
             addTask(trimNewTaskTitle);
             setNewTaskTitle("")
         } else {
            setError('Title is required');
         }
    }


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
        setError(null)
    }
    const onKeyUpHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }


    const taskList = tasks.length === 0 ? <span>is empty</span> :
        <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked)
                }
                return (
                    <li className={task.isDone ? "task-done": "task-active"} key={task.id}>
                        <input type="checkbox"
                               onChange={changeTaskStatusHandler}
                               checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button title={'x'} onClickFunction={() => {
                            deleteTask(task.id)
                        }}/>
                    </li>
                )
            })}
        </ul>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    className={error? 'error' : ''}
                />
                <Button
                    title={"+"}
                    onClickFunction={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {taskList}
            <div>
                <Button className = {filter === 'all'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('all'))} title={"All"}/>
                <Button className = {filter === 'active'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('active'))} title={"Active"}/>
                <Button className = {filter === 'completed'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('completed'))} title={"Completed"}/>
                <Button className = {filter === 'deleted'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('deleted'))} title={"Delete all tasks"}/>
            </div>
            <div>{date}</div>
        </div>
    )
};
