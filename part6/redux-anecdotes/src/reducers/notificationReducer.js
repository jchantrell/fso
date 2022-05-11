import { createSlice } from '@reduxjs/toolkit'

const initialState = ('')

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: {
            reducer: (state, action) => {
                const content = action.payload
                return state = `voted for ${content}`       
            },
        },
        clearNotification: {
            reducer: (state, action) => {
                return state = initialState
            },
        }
    },
})

export const displayNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time*1000)  
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer