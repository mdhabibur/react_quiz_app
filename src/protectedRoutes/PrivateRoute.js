import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useAuth();

    let ComponentToRender
    if(currentUser !== null){
        ComponentToRender = children
    }else {
        console.log("current  user is null")
        ComponentToRender = <Navigate to='/login' />
    }

	return ComponentToRender
};

export default PrivateRoute;
