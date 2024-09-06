import React, { useEffect } from "react";
import Layout from "../Layout";
import Answers from "../quiz/Answers";
import ProgressBar from "../quiz/ProgressBar";
import MiniPlayer from "../quiz/MiniPlayer";
import { useParams } from "react-router-dom";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import { useDispatch, useSelector } from "react-redux";
// import { runScript } from "../scripts/script";
import _ from 'lodash'
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { updateAnswers } from "../../redux/features/quizSlice";



const Quiz = () => {
	const {id} = useParams()
	// const {loading, error} = useFetchQuestions(id)


	return (
		<Layout>
			{/* {loading && <p>Loading...</p>}
			{error && <p>Error: {error} </p>} */}

			{
			    <>
					<Answers videoId={id} />
					<ProgressBar videoId = {id} />
					<MiniPlayer videoId = {id}/>
				</>
			}





      {/* {console.log(document.body)} */}
		</Layout>
	);
};

export default Quiz;
