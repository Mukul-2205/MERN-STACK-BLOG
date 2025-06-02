import {createSlice} from '@reduxjs/toolkit'

const initialState={
    loading:false,
    isAuthenticated:false,
    user:null,
    userProfile:null
}

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.isAuthenticated=true
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        logout:(state)=>{
            state.isAuthenticated=false
            state.user=null
        }
    }
})

export const {setUser,setLoading, logout}=authSlice.actions
export default authSlice.reducer