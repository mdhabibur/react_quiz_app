import React, { useEffect } from 'react'
import Layout from '../Layout'
import Summary from '../result/Summary'
import Analysis from '../result/Analysis'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../contexts/AuthContext'
import { fetchCorrectAnswers, fetchResult, fetchResultScore, updateResult, updateResultScore } from '../../redux/features/result/resultThunks'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { getDatabase, ref, set } from 'firebase/database'
import { clearResults } from '../../redux/features/result/resultSlice'

const Result = () => {

  const {id: videoId} = useParams()

  const dispatch = useDispatch()
  const {currentUser} = useAuth()
  const {uid} = currentUser

  const {answers, result = [], score, loading, error, updateResultLoading, updateResultError} = useSelector(state => state.result)


  useEffect(() => {
    if(!result.length){
      dispatch(fetchResult({uid, videoId}))
    }
    if(score === 0){
      dispatch(fetchResultScore({uid, videoId}))
    }

  }, [videoId, dispatch, uid, result.length, score])



  return (
      <Layout>
        
        <Summary id = {videoId} uid = {uid} result = {result} score = {score} loading = {loading} />

        <Analysis id = {videoId} uid = {uid} result = {result} loading = {loading}   />
      </Layout>
  )
}

export default Result