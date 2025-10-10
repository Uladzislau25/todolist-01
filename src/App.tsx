import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string
    isDone: boolean
}
export type TodolistType = {
    todolistId: string;
    title: string
    filter: filterType
}
export type filterType = 'all' | 'active' | 'completed' | 'deleted';

export type TasksStateType = {
    [todolistId: string]: Task[]
}

export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId_1, title: "What to learn", filter: "all"},
        {todolistId: todolistId_2, title: "What to bay", filter: "active"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},],
        [todolistId_2]: [
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Butter', isDone: false},
            {id: v1(), title: 'Fish', isDone: false},],
    })


    // Logic (2 step)

    const deleteTask = (taskId: string, todolistId: TodolistType['todolistId']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const addTask = (title: string, todolistId: TodolistType['todolistId']) => {
        let newTask = {id: v1(), title, isDone: false};
        let newTasks: TasksStateType = {...tasks, [todolistId]: [...tasks[todolistId], newTask]};
        setTasks(newTasks);
    }

    const changeTaskStatus = (id: Task['id'], newTaskStatus: Task["isDone"], todolistId: TodolistType['todolistId']) => {
        const nextState: TasksStateType = {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: newTaskStatus} : t)
        }
        setTasks(nextState)
    }

    const changeFilter = (filter: filterType, todolistId: TodolistType['todolistId']) => {
        const nextState: TodolistType[] = todolists.map(t => t.todolistId === todolistId ? {...t, filter: filter} : t)
        setTodolists(nextState)
    }

    const deleteTodolist = (todolistId: TodolistType["todolistId"]) => {
        const nextState: TodolistType[] = todolists.filter(t => t.todolistId !== todolistId)
        setTodolists(nextState)
        const copyTasksState= {...tasks};
        delete copyTasksState[todolistId];
        setTasks(copyTasksState)
    }


    // UI
    const getFilteredTasks = (tasks: Task[], filter: filterType) => {
        let taskForRender = tasks
        if (filter === 'active') {
            taskForRender = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            taskForRender = tasks.filter(task => task.isDone)
        }
        if (filter === 'deleted') {
            taskForRender = []
        }
        return taskForRender
    }


    const todolistsComponents = todolists.map(tl => {
      return (  <TodolistItem
                    key = {tl.todolistId}
                    todolistId={tl.todolistId}
                    title={tl.title}
                    tasks={getFilteredTasks(tasks[tl.todolistId], tl.filter)}
                    date="27.01.2027"
                    filter={tl.filter}

                    deleteTask={deleteTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    deleteTodolist={deleteTodolist}
        />
      )
    })

    return (
        <div className="app">
            {todolistsComponents}
        </div>
    )
}
