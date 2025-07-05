import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    comments: null,
}

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setComments,setLoading } = commentsSlice.actions
export default commentsSlice.reducer