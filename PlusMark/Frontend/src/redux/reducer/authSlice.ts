import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchUserId } from 'redux/thunk/authAction'


export interface AuthState {
    name: string
}

const initialState: AuthState = {
    name: ''
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: { 
        changeName: (state, actions: PayloadAction<string> )=> {
             state.name = actions.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchUserId.fulfilled, (state, actions:PayloadAction<string>)=> {
            state.name = actions.payload
        })
        builder.addCase(fetchUserId.pending, (state, actions)=> {
            state.name = ''
        })
    }
})


export const {changeName} = authSlice.actions;
export default  authSlice.reducer;