import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}
export type filterType= 'all' | 'active' | 'completed';
export const App = () => {


    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]

    const [filter, setFilter] = useState<filterType>('all')

    const changeFilter = (filter: filterType) => {
        setFilter(filter)
    }

    let filterTasks = tasks
    if(filter === 'active'){
        filterTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed'){
        filterTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={filterTasks}
                date="27.01.2027"
            changeFilter={changeFilter}/>
        </div>
    )
}
