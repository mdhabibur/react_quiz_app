import React, { useEffect, useState } from "react";
import loadingImg from "../../images/loading.avif";
import classes from "../../styles/summary.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../../redux/features/result/resultThunks";
import useFetchScoreImg from "../../hooks/useFetchScoreImg";

const Summary = ({ id, uid, result, score, loading}) => {

	const [photo, setPhoto] = useState(loadingImg)

	const scoreImgWord = (score) => {

		switch (true) {
			case score > 15:
				//excellent
				return "like"

			case score >= 10:
				return "good"

			case score < 10:
				return "failure"

			default:
				break;
		}
	}

	const scoreWord = scoreImgWord(score)

	const {data, isLoading, isError} = useFetchScoreImg(scoreWord)

	useEffect(() => {
		if(data && data.length > 0){
			console.log("photos", data[0])
			setPhoto(data[0].urls.regular)
		}

	}, [data])


	useEffect(() => {
		if(isError){
			console.log("error: ", isError);

		}

	}, [isError])

	



	let content = null
	if (loading) {
		content = <h5>Loading...</h5>;
	} else {
		content = (
			<p class={classes.score}>
				Your score is <br /> {score} out of {result?.length * 5}

			</p>
		);
	}

	console.log("result in Summary :", result)



	return (
		<div class={classes.summary}>
			<div class={classes.point}>
				{/* <!-- progress bar will be placed here --> */}
				{content}
			</div>

			<div class={classes.badge}>
				
				<img src={photo} alt="Success" />
			</div>
		</div>
	);
};

export default Summary;
