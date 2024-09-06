import React, { useEffect, useState } from 'react'
import { app } from '../firebase/app'
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";


const useFetchVideos = (videoStartAt) => {
  console.log("page: ", videoStartAt)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {

    const fetchVideos = async () => {

        const database = getDatabase(app)
        const videosRef = ref(database, 'videos')
        const videoQuery = query(videosRef, orderByKey(), startAt(videoStartAt + ""),limitToFirst(10))

        try {
            setLoading(true)
            setError("")

            const snapshot = await get(videoQuery)
            if(snapshot.exists()){
                console.log("videos:", snapshot.val())

                //convert to an array
                const newVideos = Object.values(snapshot.val())

                setVideos((prevVideos) => [...prevVideos, ...newVideos])

               

                setLoading(false)
                setError("")
            }else {
              setHasMore(false)
              setLoading(false)
            }
            
        } catch (error) {
            console.log("error: ", error)
            setLoading(false)
            setError(error)
            
        }

    }

    fetchVideos()

  }, [videoStartAt])

  console.log("videos arr: ", videos)

  return ({
    loading,
    error,
    videos,
    hasMore

  })
}

export default useFetchVideos