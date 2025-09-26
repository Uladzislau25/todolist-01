import {Task} from "./App";
import {Button} from "./button.tsx";
import {useState} from "react";


type Props = {
    title: string
    tasks: Task[]
    date?: string
    setTasks: (tasks: Task[]) => void
}
type filterType = 'all' | 'active' | 'completed' | 'deleted';


export const TodolistItem = ({title, tasks, date, setTasks}: Props) => {

    // Удаление тасок по Id
    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks);
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
                <input/>
                <Button title={"+"}/>
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
    );
};

