import {createSlice,createAsyncThunk} from'@reduxjs/toolkit'
import {signIn,signUp,googleSignIn} from "../api";

const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
}

export const login = createAsyncThunk("auth/login",async ({formVal,navigate,toast},{rejectWithValue}) => {
    try{
            const response = await signIn(formVal);
            toast.success("Success Notification !",
            {
                duration:5000, 
                style: toastStyle,
            });

            navigate('/')
            return response.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const register = createAsyncThunk("auth/register",async ({formVal,navigate,toast},{rejectWithValue}) => {
    try{
            const response = await signUp(formVal);
            toast.success("Register Successful !",
            {
                duration:5000, 
                style: toastStyle,
            });

            navigate('/')
            return response.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const googleSign = createAsyncThunk("auth/googleSignIn",async ({result,navigate,toast},{rejectWithValue}) => {
    try{
            const response = await googleSignIn(result);
            toast.success("ignIn Successful !",
            {
                duration:5000, 
                style: toastStyle,
            });

            navigate('/')
            return response.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})



const authSlice = createSlice({
    name:"Auth",
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            state.user = null;
        },
    },
    initialState:{
        user:null,
        error:'',
        loading:false,
    },
    extraReducers:{
        [login.pending]:(state,action) => {
            state.loading = true
        },
        [login.fulfilled]:(state,action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [login.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [register.pending]:(state,action) => {
            state.loading = true
        },
        [register.fulfilled]:(state,action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [register.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [googleSign.pending]:(state,action) => {
            state.loading = true
        },
        [googleSign.fulfilled]:(state,action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [googleSign.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message
        },
    }
})
export const {setUser,setLogout } = authSlice.actions;
export default authSlice.reducer