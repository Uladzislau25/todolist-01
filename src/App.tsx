import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed' | 'deleted';


export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])


    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks);
    }


    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }



    const changeTaskStatus = (id: Task['id'], newTaskStatus: Task["isDone"])=> {
        const nextState:Task[] = tasks.map(t => t.id === id ? {...t, isDone: newTaskStatus } : t )
        setTasks(nextState)
    }


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
    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={filterTasks}
                date="27.01.2027"
                filter={filter}

                deleteTask = {deleteTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeFilter = {changeFilter}
            />
        </div>
    )
}
