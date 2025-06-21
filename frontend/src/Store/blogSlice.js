import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loading:false,
    blog:null,
    yourBlogs: null
}

const blogSlice=createSlice({
    name: "blog",
    initialState,
    reducers:{
        setBlog:(state,action)=>{
            state.blog=action.payload
        },
        setYourBlogs:(state,action)=>{
            state.yourBlogs=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setBlog,setLoading, setYourBlogs}=blogSlice.actions
export default blogSlice.reducer