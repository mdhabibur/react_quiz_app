import { result } from "lodash";
import React, { useEffect } from "react";
import classes from "../../styles/answers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../../redux/features/result/resultThunks";

const AnswersAnalysis = ({ uid, id, result, loading }) => {

	console.log("result: ", result);

	let content = null;

	if (loading) {

		content = <h5>Loading...</h5>;

	} else {

		content =  result?.length > 0 ?
		 result.map((currentQuestion, index1) => {
			if (index1 < result.length) {
				return (
					<div key={index1}>
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
									style={{
										background: option.correct
											? "#91eb78"
											: option.checked
											? "#f72314"
											: "",
										fontWeight: option.correct ? "600" : "normal",
										marginTop: "3px",
									}}
								>
									<input
										type="checkbox"
										id={`option${index}`}
										className={`${classes.largeText} ${classes.correct} `}
										checked={option.checked || false} //React/Redux Controller component as 'checked' state is being maintained from Redux state
										disabled={true}
									/>
									{option ? option.title : "option title"}
								</label>
							))}
						</div>
					</div>
				);
			}
			return null; // Return null if it's the last element to avoid rendering
		}) :
		"no answers in answer analysis component";
	}

	return (
		<div className={classes.answers}>

			{console.log("current questionsss: ", result)}

			{content}

		</div>
	);
};

export default AnswersAnalysis;
