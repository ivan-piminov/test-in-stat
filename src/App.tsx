import React, {useState} from 'react';
import {CommonTasks} from "./mst";
import {observer} from "mobx-react";
import styled from 'styled-components'


interface Props {
    rootTree: CommonTasks
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  padding-top: .5rem;
  width: 800px;
  margin: 0 auto;

  input {
    margin-right: .5rem;
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }

  button {
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
  }
`
const ListItem = styled.div`
  width: 500px;
  margin-top: .5rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: .5rem;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
    min-width: 0;
    position: relative;

    span {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
      cursor: pointer;
      user-select: none;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      font-weight: 400;
      color: #fff;
      background-color: #dc3545;
      border-color: #dc3545;
    }
  }
`

const App = observer((props: Props) => {

    const [newTaskName, setNewTaskName] = useState("")


    const {filteredTasks, addNewTask, changeStatus, deleteTask} = props.rootTree
    const filteredTasksVisible = props.rootTree.filteredTasks(newTaskName)

    const newTask = (newTaskName: string) => {
        if (newTaskName) {
            addNewTask(newTaskName);
        } else return null
    }

    return (
        <Main>
            <Form>
                <input type="text" placeholder='введите название задачи'
                       value={newTaskName} onChange={(e) => {
                    setNewTaskName(e.target.value);
                    filteredTasks(newTaskName)
                }}
                />
                <button type='button' onClick={() => {
                    newTask(newTaskName)
                    setNewTaskName('')
                }}>добавить
                </button>
            </Form>

            {filteredTasksVisible.map(item => {
                return <ListItem key={item.id}>
                    <div>
                        <input type="checkbox" checked={item.isDone} onChange={() => changeStatus(item.id)}/>
                        <strong>{item.taskName}</strong>
                        <span onClick={() => deleteTask(item.id)}>X
                        </span>
                    </div>
                </ListItem>
            })}
        </Main>
    );
})
export default App;

