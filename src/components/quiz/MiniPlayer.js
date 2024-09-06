import React, { useEffect } from "react";
import img3 from "../../images/3.jpg";
import { miniPlayerScript } from "../scripts/miniPlayer";
import "../../styles/miniPlayer.css";
//css file of miniPlayer is loaded from  miniPlayer.css
import ReactPlayer from "react-player";

const MiniPlayer = ({ videoId }) => {
	useEffect(() => {
		miniPlayerScript();
	}, []);

	return (
		<div>
			<div className="miniPlayer floatingBtn">
				<span className={`material-icons-outlined open playerBtn`}>
					{" "}
					play_circle_filled{" "}
				</span>
				<span className={`material-icons-outlined close`}> close </span>
				
				<ReactPlayer
						className = "reactPlayer"
						url={`https://www.youtube.com/watch?v=${videoId}`}
						width="380px"
						height="220px"

					/>

				{/* <p>#23 React Hooks Bangla - React useReducer hook Bangla</p> */}
			</div>

		</div>
	);
};

export default MiniPlayer;
