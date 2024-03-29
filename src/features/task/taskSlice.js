import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        completed: false
    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Task 2 description',
        completed: false
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {

      
            state.push(action.payload);
            // [...state, action.payload]
        } ,
        editTask: (state, action) => {
            const {id,title,description}=action.payload

            const taskFound=state.find(task => task.id === id);
            if (taskFound) {
                taskFound.title=title;
                taskFound.description=description;
            }

            // state.push(action.payload);

        } ,

        deleteTask: (state, action) => {//state => para acceder al arreglo
            const taskFound=state.find(task => task.id === action.payload);
            if (taskFound) {

                state.splice(state.indexOf(taskFound),1)
                
            }
            console.log( taskFound);
            // state.push(action.payload);
            // [...state, action.payload]
        } 

    }

})

export const { addTask , deleteTask,editTask} = taskSlice.actions;
export default taskSlice.reducer