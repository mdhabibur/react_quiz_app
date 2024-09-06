import React, { useState } from "react";
import Video from "./Video";
import classes from "../../styles/videos.module.css";
import useFetchVideos from "../../hooks/useFetchVideos";
import { showError, showLoading } from "../messages/showMsg";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../contexts/AuthContext";

const Videos = () => {
    const [videoStartAt, setVideoStartAt] = useState(1)
	const { loading, error, videos, hasMore} = useFetchVideos(videoStartAt);

	const {currentUser} = useAuth()

	console.log("current user: ", currentUser)
	
      const updateVideoStartAt = () => {
            setVideoStartAt((prev) => prev + 10)
      }

	return (
		<div>
			{loading && showLoading(loading)}
			{error && showError(error)}
			
			{videos.length > 0 && (
				<InfiniteScroll
                        className={classes.videos}
                        dataLength={videos.length}
                        next={() => updateVideoStartAt()}
                        hasMore = {hasMore}
                        loader={<h5>Loading...</h5>}
                        >
                              {console.log("videos state: ", videos)}
					{videos.map((video, index) => (
						<Video
							key={`${video.youtubeID}-${index}`}
							id={video.youtubeID}
							title={video.title}
							noq={video.noq}
						/>
					))}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default Videos;
