import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string
    isDone: boolean
}
export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])


    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={tasks}
                date="27.01.2027"
                setTasks={setTasks}
            />
        </div>
    )
}
