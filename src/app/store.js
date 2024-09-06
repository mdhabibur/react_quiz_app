import { configureStore } from "@reduxjs/toolkit";
import quizReducer from '../redux/features/quizSlice'
import resultReducer  from '../redux/features/result/resultSlice'


const store = configureStore({
    reducer: {
        quiz: quizReducer,
        result: resultReducer

    }
})

export default store