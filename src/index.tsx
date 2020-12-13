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

reportWebVitals();
