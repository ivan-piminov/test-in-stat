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
            <form>
                <div className="form-group d-flex mt-2" style={{width: '800px', margin: '0 auto'}}>
                    <input type="text" className="form-control mr-2" placeholder='введите название задачи'
                           value={newTaskName} onChange={(e) => {
                        setNewTaskName(e.target.value);
                        filteredTasks(newTaskName)
                    }}
                    />
                    <button type='button' className="btn btn-primary" onClick={() => {
                        newTask(newTaskName)
                        setNewTaskName('')
                    }}>добавить
                    </button>
                </div>
            </form>

            {filteredTasksVisible.map(item => {
                return <div key={item.id} style={{width: '500px', margin: '0 auto'}} className='mt-2'>
                    <div className="card d-flex flex-row justify-content-between align-items-center pl-1">
                        <input type="checkbox" checked={item.isDone} onChange={() => changeStatus(item.id)}/>
                        <span>{item.taskName}</span>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteTask(item.id)}>X
                        </button>
                    </div>
                </div>
            })}
        </>
    );
})
export default App;

