import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    questions: [],
    answers: [],
    currentIndex: 0,
    progress: 25,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload
            state.currentIndex = 0 //resetn index whenever new questions are set

        },

        nextQuestion(state) {
            console.log("state now: ", state.questions)
            if(state.currentIndex < state.questions.length - 1){
                state.currentIndex += 1
            }

        },

        previousQuestion(state) {
            if(state.currentIndex >= 1){
                state.currentIndex -= 1
            }

        },

        updateAnswers(state, action){
            state.answers = action.payload

        },

        calculateProgress(state, action){

            state.progress = ((state.currentIndex + 1)/state.questions.length) * 100


        },

        resetQuiz(state) {
            state.currentIndex = 0
            state.questions = []
            state.answers = []
            state.progress = 25


        }
    }
})

export const {setQuestions, nextQuestion, previousQuestion, updateAnswers, calculateProgress, resetQuiz} = quizSlice.actions

export default quizSlice.reducer