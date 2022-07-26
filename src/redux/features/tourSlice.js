import {createSlice,createAsyncThunk} from'@reduxjs/toolkit'
import {createTour,getSingleTour,getTour,getUserTour,deleteTour, updateTour, getToursBySearch,getTagByTours,getRelatedTours, likeTour} from "../api";

export const tourCreate = createAsyncThunk("tour/createTour",async ({updatedTourData,navigate,toast},{rejectWithValue}) => {
    try{
            const response = await createTour(updatedTourData);
            toast.success("Success Added !",{duration:5000});
            navigate('/')
            return response.data
        
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getTours = createAsyncThunk("tour/getTours",async (page,{rejectWithValue}) => {
    try{
            const response = await getTour(page);
            return response.data
        
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getOneTours = createAsyncThunk("tour/getOneTours",async (id,{rejectWithValue}) => {
    try{
            const response = await getSingleTour(id);
            return response.data
        
        }catch(err){
            return rejectWithValue(err.response.data)
        }
})

export const getIDUserTour = createAsyncThunk("tour/getIDUserTour",async (Userid,{rejectWithValue}) => {
    try{
        const response = await getUserTour(Userid);
        return response.data
        
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const delTour = createAsyncThunk("tour/deleteTour",async ({id,toast},{rejectWithValue}) => {
    try{
        console.log(id)
        const response = await deleteTour(id);
        toast.success("Tour Deleted Successful")
        return response.data
        
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const updTour = createAsyncThunk("tour/updTour",async ({id,updatedTourData,toast,navigate},{rejectWithValue}) => {
    try{
        const response = await updateTour(updatedTourData,id);
        toast.success("Tour Updated Successful")
        navigate('/')
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const searchTours = createAsyncThunk("tour/searchTours",async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await getToursBySearch(searchQuery);
            return response.data;
            }catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const tagTours = createAsyncThunk("tour/tagTours",async (tag, { rejectWithValue }) => {
        try {
            const response = await getTagByTours(tag);
            return response.data;
            }catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getRelated = createAsyncThunk("tour/getRelated",async (tags, { rejectWithValue }) => {
        try {
            const response = await getRelatedTours(tags);
            return response.data;
            }catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const setlikes = createAsyncThunk("tour/setlikes",async ({_id}, { rejectWithValue }) => {
    try {
        const response = await likeTour(_id);
        return response.data;
        }catch (err) {
        return rejectWithValue(err.response.data);
    }
}
);

// why do we need to have id as an object 


const tourSlice = createSlice({
    name:"tour",
    initialState:{
        tour:{},
        tours:[],
        userTours:[],
        tagsTours:[],
        relatedTours:[],
        currentPage:1,
        numberOfPages: null,
        error:'',
        loading:false,
    },
    reducers:{
        setCurrentPage:(state,action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers:{
            [tourCreate.pending]: (state, action) => {
                state.loading = true;
            },
            // WHY IS THERE A BRACXKETS FOR THE TOURS NORMALLY BUT IN THE OTHER ONE THERE IS NO BRACKETS I NED ANSWERS NOW SEARCH ABOUT IT LATER ON !
            [tourCreate.fulfilled]: (state, action) => {
                state.loading = false;
                state.tours = [action.payload];
            },
            [tourCreate.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [getTours.pending]: (state, action) => {
                state.loading = true;
            },
            
            [getTours.fulfilled]: (state, action) => {
                state.loading = false;
                state.tours = action.payload.data;
                state.numberOfPages = action.payload.numberOfPages
                state.currentPage = action.payload.currentPage
            },
            
            [getTours.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [getOneTours.pending]: (state, action) => {
                state.loading = true;
            },
            [getOneTours.fulfilled]: (state, action) => {
                state.loading = false;
                state.tour = action.payload;
            },
            [getOneTours.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [getIDUserTour.pending]: (state, action) => {
                state.loading = true;
            },
            [getIDUserTour.fulfilled]: (state, action) => {
                state.loading = false;
                state.userTours = action.payload;
            },
            [getIDUserTour.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [delTour.pending]: (state, action) => {
                state.loading = true;
            },
            // test this once
            [delTour.fulfilled]: (state, action) => {
                state.loading = false;
                const {arg:{id}} = action.meta
                if(id){
                    state.userTours = state.userTours.filter((tours)=>{
                        return tours._id !== id 
                    })
                    state.tours = state.tours.filter((tours)=>{
                        return tours._id !== id 
                    })
                }
            },
            [delTour.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [updTour.pending]: (state, action) => {
                state.loading = true;
            },
            // test this once
            [updTour.fulfilled]: (state, action) => {
                state.loading = false;
                const {arg:{id}} = action.meta
                if(id){
                    state.userTours = state.userTours.map((tours)=>{
                        return tours._id === id ? action.payload : tours 
                    })
                    state.tours = state.tours.map((tours)=>{
                        return tours._id === id ? action.payload : tours 
                    })
                }
            },
            [updTour.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [searchTours.pending]: (state, action) => {
                state.loading = true;
            },
            [searchTours.fulfilled]: (state, action) => {
                state.loading = false;
                state.tours = action.payload;
            },
            [searchTours.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [tagTours.pending]: (state, action) => {
                state.loading = true;
            },
            [tagTours.fulfilled]: (state, action) => {
                state.loading = false;
                state.tagsTours = action.payload;
            },
            [tagTours.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [getRelated.pending]: (state, action) => {
                state.loading = true;
            },
            [getRelated.fulfilled]: (state, action) => {
                state.loading = false;
                state.relatedTours = action.payload;
            },
            [getRelated.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            },
            [setlikes.pending]: (state, action) => {
            },
            // test this once
            [setlikes.fulfilled]: (state, action) => {
                state.loading = false;
                const {arg:{_id}} = action?.meta
                if (_id) {
                    state.tours = state.tours.map((item) =>
                        item._id === _id ? action.payload : item
                    );
                }
            },
            [setlikes.rejected]: (state, action) => {
                state.error = action.payload.message;
            },
    }
})

export const {setCurrentPage} = tourSlice.actions;

export default tourSlice.reducer;
