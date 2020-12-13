import {applySnapshot, Instance, types} from "mobx-state-tree";

const TaskModel = types.model('Task', {
    id: types.number,
    taskName: types.string,
    isDone: types.boolean
})

export const CommonTasksModel = types.model('CommonTasks', {
    tasks: types.array(TaskModel)
})
    .actions(self => ({
        addNewTask(taskName: string) {
            const id = Math.random()
            self.tasks.push({id, taskName, isDone: false})
        },
        deleteTask(id: number) {
            applySnapshot(self, {
                ...self,
                tasks: self.tasks.filter(task => task.id !== id)
            })
        },
        changeStatus(id: number) {
            applySnapshot(self, {
                ...self,
                tasks: self.tasks.map(task => {
                    if (task.id === id) {
                        return {
                            ...task,
                            isDone: !task.isDone
                        }
                    } else return task
                })
            })
        }
    }))
    .views(self => ({
        filteredTasks(searchString: string) {
            return self.tasks.filter(task => task.taskName.includes(searchString))
        }
    }))
export type Task = Instance<typeof TaskModel>;
export type CommonTasks = Instance<typeof CommonTasksModel>;


