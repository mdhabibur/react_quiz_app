import { createSlice } from "@reduxjs/toolkit"
import { fetchCorrectAnswers, fetchResult, fetchResultScore, updateResult, updateResultScore } from "./resultThunks"


const initialState = {
    answers: [],
    result: [],
    score: 0,
    loading: false,
    error: null,
    updateResultLoading: false,
    updateResultError: null,
    updateResultSuccess: false
}


const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        clearResults(state){
            state.answers = []
            state.result = []
            state.loading = false
            state.error = null
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchCorrectAnswers.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchCorrectAnswers.fulfilled, (state, action) => {
                state.loading = false
                state.answers = action.payload
            })
            .addCase(fetchCorrectAnswers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchResult.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchResult.fulfilled, (state, action) => {
                state.result = action.payload;
                state.loading = false;
            })
            .addCase(fetchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchResultScore.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchResultScore.fulfilled, (state, action) => {
                state.score = action.payload;
                state.loading = false;
            })
            .addCase(fetchResultScore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateResult.pending, (state, action) => {
                state.updateResultLoading = true
                state.updateResultError = null
                state.updateResultSuccess = false
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                state.result = action.payload
                state.updateResultLoading = false
                state.updateResultSuccess = true
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.updateResultLoading = false
                state.updateResultError = action.payload
                state.updateResultSuccess = false
            })
            .addCase(updateResultScore.pending, (state, action) => {
                state.loading = true
                state.error = null
            }) 
            .addCase(updateResultScore.fulfilled, (state, action) => {
                state.loading = false
                state.score = action.payload
            })
            .addCase(updateResultScore.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })



    }



})

export const {clearResults}  = resultSlice.actions
export default resultSlice.reducer