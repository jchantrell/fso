import { createSlice } from '@reduxjs/toolkit'

const initialState = ('')

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: {
            reducer: (state, action) => {
                const content = action.payload.content
                return state = `voted for ${content}`       
            },
        },
        removeNotification: {
            reducer: (state, action) => {
                return state = initialState
            },
        }
    },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer