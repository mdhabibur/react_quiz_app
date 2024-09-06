import React, { useEffect, useState } from 'react'
import { app } from '../firebase/app'
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useDispatch } from 'react-redux';
import { setQuestions, updateAnswers } from '../redux/features/quizSlice';


const useFetchQuestions = (id) => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {

    const fetchQuestions = async () => {

        const database = getDatabase(app)
        const questionsRef = ref(database, `quiz/${id}/questions`)
        const questionsQuery = query(questionsRef, orderByKey())

        try {
            setLoading(true)
            setError("")

            const snapshot = await get(questionsQuery)
            if(snapshot.exists()){
                console.log("questions:", snapshot.val())

                //convert to an array
                const newQuestions = Object.values(snapshot.val())

                //it duplicates questions
                // setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions])

                dispatch(setQuestions(newQuestions))

                //for submit answer
                dispatch(updateAnswers(newQuestions))

                setLoading(false)
                setError("")
            }else {
                dispatch(setQuestions([]))
            }
            
        } catch (error) {
            console.log("error: ", error)
            setLoading(false)
            setError(error)
            
        }

    }

    fetchQuestions()

  }, [id, dispatch])

//   console.log("questions arr: ", questions)

  return ({
    loading,
    error,

  })
}

export default useFetchQuestions