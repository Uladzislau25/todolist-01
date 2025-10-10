import {filterType, Task, TodolistType} from "./App";
import {Button} from "./button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";


type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: filterType
    todolistId: string

    deleteTask: (taskId: Task["id"], todolistId: TodolistType["todolistId"]) => void
    addTask: (title: Task['title'], todolistId: TodolistType["todolistId"]) => void
    changeFilter: (filter: filterType, todolistId: TodolistType["todolistId"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task['isDone'], todolistId: TodolistType["todolistId"]) => void
    deleteTodolist: (todolistId: TodolistType["todolistId"]) => void
}



export const TodolistItem = ({title, tasks, filter, date, todolistId, deleteTask, addTask, changeTaskStatus, changeFilter, deleteTodolist}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addTaskHandler = () => {
        const trimNewTaskTitle = newTaskTitle.trim()
         if (trimNewTaskTitle !== '') {
             addTask(trimNewTaskTitle, todolistId);
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
            addTask(newTaskTitle, todolistId);
            setNewTaskTitle("")
        }
    }


    const taskList = tasks.length === 0 ? <span>is empty</span> :
        <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                }
                return (
                    <li className={task.isDone ? "task-done": "task-active"} key={task.id}>
                        <input type="checkbox"
                               onChange={changeTaskStatusHandler}
                               checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button title={'x'} onClickFunction={() => {
                            deleteTask(task.id, todolistId)
                        }}/>
                    </li>
                )
            })}
        </ul>

    return (
        <div>
            <h3>{title} <Button title={"x"} onClickFunction={()=> deleteTodolist(todolistId)}/></h3>
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
                        onClickFunction={() => (changeFilter('all', todolistId))} title={"All"}/>
                <Button className = {filter === 'active'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('active', todolistId))} title={"Active"}/>
                <Button className = {filter === 'completed'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('completed', todolistId))} title={"Completed"}/>
                <Button className = {filter === 'deleted'? "btn-filter-active": ""}
                        onClickFunction={() => (changeFilter('deleted', todolistId))} title={"Delete all tasks"}/>
            </div>
            <div>{date}</div>
        </div>
    )
};
