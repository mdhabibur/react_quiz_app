import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {

  const {currentUser} = useAuth()

  let componentToRender = null

  if(!currentUser){
    componentToRender = children
  }else{
    componentToRender = <Navigate to='/' />

  }

  return componentToRender
}

export default PublicRoute