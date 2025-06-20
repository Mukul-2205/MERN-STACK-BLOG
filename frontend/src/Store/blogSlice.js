import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loading:false,
    blog:null,
}

const blogSlice=createSlice({
    name: "blog",
    initialState,
    reducers:{
        setBlog:(state,action)=>{
            state.blog=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setBlog,setLoading}=blogSlice.actions
export default blogSlice.reducer