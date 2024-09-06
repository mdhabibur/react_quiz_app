import React from "react";
import classes from "../../styles/video.module.css"
import { Link } from "react-router-dom";

const Video = ({id, title, noq}) => {
	return (
		<div>
			<Link to={`/quiz/${id}`}>
				<div className={classes.video}>
					<img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
					<p>{title}</p>
					<div className={classes.qmeta}>
						<p>{noq} Questions</p>
						<p>Score : Not taken yet</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Video;
