import {Task} from "./App";
import {Button} from "./button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {v1} from "uuid";


type Props = {
    title: string
    tasks: Task[]
    date?: string
    setTasks: (tasks: Task[]) => void
}
type filterType = 'all' | 'active' | 'completed' | 'deleted';


export const TodolistItem = ({title, tasks, date, setTasks}: Props) => {

    // Удаление тасок по Id
    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks);
    }
    // Добавление новых тасок
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle("")
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    // Фильтрация тасок по типу
    const [filter, setFilter] = useState<filterType>('all')

    const changeFilter = (filter: filterType) => {
        setFilter(filter)
    }

    let filterTasks = tasks
    if (filter === 'active') {
        filterTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filterTasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'deleted') {
        filterTasks = []
    }

    // Создание и отрисовка списка тасок
    const taskList = filterTasks.length === 0 ? <span>is empty</span> :
        <ul>
            {filterTasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
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
                />
                <Button
                    title={"+"}
                    onClickFunction={addTaskHandler}/>
            </div>
            {taskList}
            <div>
                <Button onClickFunction={() => (changeFilter('all'))} title={"All"}/>
                <Button onClickFunction={() => (changeFilter('active'))} title={"Active"}/>
                <Button onClickFunction={() => (changeFilter('completed'))} title={"Completed"}/>
                <Button onClickFunction={() => (changeFilter('deleted'))} title={"Delete all tasks"}/>
            </div>
            <div>{date}</div>
        </div>
    )
};
