import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { progressBarScript } from "../scripts/progressBarScript";
import '../../styles/progressbar.css'
import { useDispatch, useSelector } from "react-redux";
import { calculateProgress, nextQuestion, previousQuestion, resetQuiz } from "../../redux/features/quizSlice";
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { fetchCorrectAnswers, updateResult, updateResultScore } from "../../redux/features/result/resultThunks";
import calculateScore from "../../hooks/calculateScore";


const ProgressBar = ({videoId}) => {

	const progress = useSelector((state) => state.quiz.progress)

	const submittedAnswers = useSelector((state) => state.quiz.answers)
	const correctAnswers = useSelector((state) => state.result.answers)

	const {answers, result, score, loading, error, updateResultLoading, updateResultError, updateResultSuccess} = useSelector(state => state.result)


	const {currentUser} = useAuth()
	console.log("current user: ", currentUser)
	const {uid} = currentUser

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
	progressBarScript()
	dispatch(fetchCorrectAnswers(videoId))
	}, [videoId,dispatch])


	const handlePreviousQuestion = () => {
		dispatch(previousQuestion())
		dispatch(calculateProgress())
	}

	const handleNextQuestion = () => {
		dispatch(nextQuestion())
		dispatch(calculateProgress())
	}

	const submitQuiz = () => {
		console.log("quiz submitted")

		console.log("submitted ans: ", submittedAnswers)
		console.log("correct Answers: ", correctAnswers)

		const {userScore, resultWithCorrectAnswers } = calculateScore(correctAnswers, submittedAnswers)

		console.log("result with correct ans: ", resultWithCorrectAnswers)
		console.log("userScore: ", userScore)

		//now upload "resultWithCorrectAnswers" array to db


		try {
			dispatch(updateResult({videoId, uid,resultWithCorrectAnswers}))
			dispatch(updateResultScore({videoId, uid, userScore}))

			//reset quiz
			dispatch(resetQuiz())

			//navigate to result page
			navigate(`/result/${videoId}`)

			
			
		} catch (error) {

			console.log("ans upload error: ", error)
			
		}

		
		/*
		//upload to firebase
		const db = getDatabase()
		const {uid} = currentUser
		const resultRef = ref(db, `result/${uid}/${videoId}/questions`)
		set(resultRef, submittedAnswers)
			.then(() => {
				console.log("Submitted answers uploaded successfully!");

				console.log("submitted answers: ", submittedAnswers)

				//reset quiz
				dispatch(resetQuiz())

				//navigate to result page
				navigate(`/result/${videoId}`)


			})
			.catch((error) => {
				console.error("Error uploading submitted answers: ", error);

			})

			*/
		



	}

	return (
		<div className="progressBar">

			<div className="backButton" onClick={handlePreviousQuestion}>
				<span className="material-icons-outlined"> arrow_back </span>
			</div>


			<div className="rangeArea">
				<div className="tooltip"
				style={{ left: `calc(${progress}% - 65px)` }}
				>{progress}% Complete!</div>
				<div className="rangeBody">
					<div className="progress" style={{width: `${progress}%`}}></div>
				</div>
			</div>
            

			<button className={`button next`} onClick={progress < 100 ? handleNextQuestion : submitQuiz}>
				<span>{progress < 100 ? "Next Question" : "Submit Quiz" }</span>
				<span className="material-icons-outlined"> arrow_forward </span>
			</button>

		</div>
	);
};

export default ProgressBar;
