import React, { useEffect } from "react";
import Answers from "../quiz/Answers";
import classes from "../../styles/analysis.module.css"
import AnswersAnalysis from "./AnswersAnalysis";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../../redux/features/result/resultThunks";

const Analysis = ({id, uid, result, loading}) => {

	return (
		<div class={classes.analysis}>
			<h1>Question Analysis</h1>


			<div class={classes.question}>
				<div class={classes.qtitle}>
					<span class="material-icons-outlined"> help_outline </span>
					Here goes the question from Learn with Sumit?
				</div>

				<AnswersAnalysis uid={uid} id={id} result = {result} loading = {loading} />
			</div>
		</div>
	);
};

export default Analysis;
