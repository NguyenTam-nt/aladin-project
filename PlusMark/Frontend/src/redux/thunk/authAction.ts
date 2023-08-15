import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserId = createAsyncThunk('fetch/User', async (id:number)=> {
    const linkImage = (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
    console.log(id,linkImage);
    
    return linkImage
   
})