import React, { useEffect } from "react";
import classes from "../../styles/answers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { updateAnswers } from "../../redux/features/quizSlice";
import { getDatabase, ref, set } from "firebase/database";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import _ from 'lodash'

const Answers = ({ videoId }) => {
	const { loading, error } = useFetchQuestions(videoId);

	const dispatch = useDispatch();

	const questions = useSelector((state) => state.quiz.questions);

	const submittedAnswers = useSelector((state) => state.quiz.answers);

	const currentIndex = useSelector((state) => state.quiz.currentIndex);
	const currentQuestion = submittedAnswers[currentIndex];

	console.log("questions: ", questions);
	console.log("submitted answers: ", submittedAnswers);
	console.log("current question: ", currentQuestion);

	const handleOptionsSelected = (e, index) => {
		console.log("event: ", e, "index: ", index);
		console.log("is handle option selected called:");

		//must not mutate redux state reference array directly rather should be updated immutable with an updated copy

		const updatedAnswers = _.cloneDeep(submittedAnswers)

		updatedAnswers[currentIndex].options[index].checked = e.target.checked;

		//dispatch an action to update redux state
		dispatch(updateAnswers(updatedAnswers));

		console.log("updated answers: ", submittedAnswers);
		console.log("submitted questions : ", questions);
	};

	return (
		<div className={classes.answers}>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error} </p>}

			{console.log("current questionsss: ", currentQuestion)}

			{!loading && !error && currentQuestion && (
				<>
					<div className="question_title">
						<h1 className="head1">
							{currentQuestion ? currentQuestion.title : "Question Title"}
						</h1>
						<h4>Question can have multiple answers</h4>
					</div>

					<div className="question_options">
						{currentQuestion.options.map((option, index) => (
							<label
								key={index}
								id={`label${index}`}
								className={`${classes.answer}`}
								htmlFor={`option${index}`}
							>
								<input
									type="checkbox"
									id={`option${index}`}
									className={classes.largeText}
									checked={option.checked || false} //React/Redux Controller component as 'checked' state is being maintained from Redux state
									onChange={(e) => handleOptionsSelected(e, index)}
								/>
								{option ? option.title : "option title"}
							</label>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Answers;

/*

return (
	<div className={classes.answers}>
		<label id="label1" className={`${classes.answer}`} htmlFor="option1">
			<input type="checkbox" id="option1" className={classes.largeText} />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option2" id="label2">
			<input type="checkbox" id="option2" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option3">
			<input type="checkbox" id="option3" />A New Hope 1
		</label>

		<label className={`${classes.answer} ${classes.wrong}`} htmlFor="option4">
			<input type="checkbox" id="option4" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option5">
			<input type="checkbox" id="option5" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option6">
			<input type="checkbox" id="option6" />A New Hope 1
		</label>

		<label className={`${classes.answer} ${classes.correct}`} htmlFor="option7">
			<input type="checkbox" id="option7" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option8">
			<input type="checkbox" id="option8" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option9">
			<input type="checkbox" id="option9" />A New Hope 1
		</label>

		<label className={classes.answer} htmlFor="option10">
			<input type="checkbox" id="option10" />A New Hope 1
		</label>
	</div>
);

*/
