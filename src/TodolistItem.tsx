import {filterType, Task, TodolistType} from "./App";
import {Button} from "./button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";


type Props = {
    title: string
    tasks: Task[]
    date?: string
    filter: filterType
    todolistId: string

    deleteTask: (taskId: Task["id"], todolistId: TodolistType["todolistId"]) => void
    createTask: (title: Task['title'], todolistId: TodolistType["todolistId"]) => void
    changeFilter: (filter: filterType, todolistId: TodolistType["todolistId"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task['isDone'], todolistId: TodolistType["todolistId"]) => void
    deleteTodolist: (todolistId: TodolistType["todolistId"]) => void
}


export const TodolistItem = ({
                                 title,
                                 tasks,
                                 filter,
                                 date,
                                 todolistId,

                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 deleteTodolist
                             }: Props) => {

    const createTaskHandler = (taskTitle: Task['title']) => {
        createTask(taskTitle, todolistId)
    }

    const taskList = tasks.length === 0 ? <span>is empty</span> :
        <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                }
                return (
                    <li className={task.isDone ? "task-done" : "task-active"} key={task.id}>
                        <input type="checkbox"
                               onChange={changeTaskStatusHandler}
                               checked={task.isDone}/>
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
            <h3>{title} <Button title={"x"} onClickFunction={() => deleteTodolist(todolistId)}/></h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {taskList}
            <div>
                <Button className={filter === 'all' ? "btn-filter-active" : ""}
                        onClickFunction={() => (changeFilter('all', todolistId))} title={"All"}/>
                <Button className={filter === 'active' ? "btn-filter-active" : ""}
                        onClickFunction={() => (changeFilter('active', todolistId))} title={"Active"}/>
                <Button className={filter === 'completed' ? "btn-filter-active" : ""}
                        onClickFunction={() => (changeFilter('completed', todolistId))} title={"Completed"}/>
                <Button className={filter === 'deleted' ? "btn-filter-active" : ""}
                        onClickFunction={() => (changeFilter('deleted', todolistId))} title={"Delete all tasks"}/>
            </div>
            <div>{date}</div>
        </div>
    )
};
