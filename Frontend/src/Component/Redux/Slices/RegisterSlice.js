import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  users : [{
    name:'',
    email:'',
    password:''
  }]
}

const registerSlice = createSlice({
name:register,
initialState,
reducers: {
  signUp: (state,{payload})=>{
    console.log(payload)
    state.users = [payload]
  }
}
})

export const {signUp} = registerSlice.actions;
export default registerSlice.reducer;