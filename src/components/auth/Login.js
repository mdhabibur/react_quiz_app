import React, { useState } from "react";
import loginImg from "../../images/login.svg"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { showError, showLoading, showSuccess } from "../messages/showMsg";

const Login = () => {


	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")


	const {       
		currentUser,
        signup,
        signIn,
        logOut
	    } = useAuth()

	const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)
		setError("")
		setSuccess("")

		try {
			const response = await signIn(email, password)
			console.log("response:", response)
			setLoading(false)
			setError("")
			setSuccess("logged in successfully")
			navigate("/")

			
		} catch (error) {
			console.log(error)
			setLoading(false)
			setError(error?.message || "login failed")
			setSuccess("")

			
		}
	


	}



	return (
		<div>
			<h1>Login to your account</h1>

			<div className="column">

				<div className="illustration">
					<img src={loginImg} alt="Login" />
				</div>

				<form className="login form" onSubmit={handleSubmit}>
					<div className="textInput">
						<input type="text" 
						placeholder="Enter email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						
						
						/>
						<span className="material-icons-outlined"> alternate_email </span>
					</div>

					<div className="textInput">
						<input type="password"
						 placeholder="Enter password"
						 required
						 value={password}
						 onChange={(e) => setPassword(e.target.value)}

						 />
						<span className="material-icons-outlined"> lock </span>
					</div>

					<button className="button" type="submit">
						<span>Login</span>
					</button>

					<div className="info">
						Don't have an account? <Link to="/signup">Signup</Link> instead.
					</div>

					{/* messages  */}
					{loading && showLoading(loading)}
					{error && showError(error)}
					{success && showSuccess(success)}


				</form>


			</div>
		</div>
	);
};

export default Login;
