import React, {useState} from 'react';
import {CommonTasks} from "./mst";
import {observer} from "mobx-react";


interface Props {
    rootTree: CommonTasks
}

const App = observer((props: Props) => {

    const [newTaskName, setNewTaskName] = useState("")

    console.log(props.rootTree.tasks)

    const {filteredTasks, addNewTask, changeStatus, deleteTask} = props.rootTree
    const filteredTasksVisible = props.rootTree.filteredTasks(newTaskName)

    const newTask = (newTaskName: string) => {
        if (newTaskName) {
            addNewTask(newTaskName);
        } else return null
    }

    return (
        <>
            <input type="text" placeholder='введите название задачи'
                   value={newTaskName} onChange={(e) => {
                setNewTaskName(e.target.value);
                filteredTasks(newTaskName)
            }}
            />
            <button onClick={() => {
                newTask(newTaskName)
                setNewTaskName('')
            }}>добавить задачу
            </button>
            {filteredTasksVisible.map(item => {
                return <div key={item.id}>
                    <input type="checkbox" checked={item.isDone} onChange={() => changeStatus(item.id)}/>
                    <span>{item.taskName}</span>
                    <button onClick={() => deleteTask(item.id)}>X</button>
                </div>
            })}
        </>
    );
})
export default App;

