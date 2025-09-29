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
    const [error, setError] = useState<string | null>(null)

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
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

    const changeTaskStatus = (id: Task['id'], newTaskStatus: Task["isDone"])=> {
        const nextState:Task[] = tasks.map(t => t.id === id ? {...t, isDone: newTaskStatus } : t )
        setTasks(nextState)
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
