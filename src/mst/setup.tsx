import {CommonTasksModel} from "./index";
import {onSnapshot} from "mobx-state-tree";

export const SetupStore =()=>{
    const rootTree = CommonTasksModel.create({
        tasks: [{id:1, taskName:'сходить погулять',isDone:false},
            {id:2, taskName:'почитать книгу',isDone:false},
            {id:3, taskName:'заняться спортом',isDone:false}
        ]
    })
    onSnapshot(rootTree, (snapshot) => console.log(snapshot))
    return {rootTree}

}
