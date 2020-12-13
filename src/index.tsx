import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CommonTasksModel} from "./mst";
import {onSnapshot} from "mobx-state-tree";

const rootTree = CommonTasksModel.create({
    tasks: [{id:1, taskName:'сходить погулять',isDone:false},
        {id:2, taskName:'почитать книгу',isDone:false},
        {id:3, taskName:'заняться спортом',isDone:false}
    ]
}
)
onSnapshot(rootTree, (snapshot) => console.log(snapshot))


ReactDOM.render(
  <React.StrictMode>
    <App rootTree={rootTree} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
