import React, { useState } from "react";
import signupImg from '../../images/signup.svg'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { showError, showLoading, showSuccess } from "../messages/showMsg";

const SignUp = () => {


	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

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

		console.log("password: ", password)
		console.log("confirmedpass: ", confirmPassword)

		if(password !== confirmPassword){
			setError("both passwords should match")
		}
		else {

			setLoading(true)
			setError("")
			setSuccess("")
	
			try {
				const response = await signup(name, email, password)
				console.log("response:", response)
				console.log("current user: ", currentUser)
				setLoading(false)
				setError("")
				setSuccess("signed up successfully")
				navigate("/")

				
			} catch (error) {
				console.log(error)
				setLoading(false)
				setError(error?.message || "account creation failed")
				setSuccess("")

				
			}
	

		}




	}

	console.log("current user", currentUser)

	return (
		<div>
			<h1>Create an account</h1>
			<div className="column">

				<div className="illustration">
					<img src={signupImg} alt="Signup" />
				</div>


				<form className="signup form" onSubmit={handleSubmit}>

					<div className="textInput">
						<input type="text" 
						placeholder="Enter name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}

						 />
						<span className="material-icons-outlined"> person </span>
					</div>

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

					<div className="textInput">
						<input type="password" 
						placeholder="Confirm password"
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						
						/>
						<span className="material-icons-outlined"> lock_clock </span>
					</div>

					<label>
						<input type="checkbox"  required/>
						<span>I agree to the Terms & Conditions</span>
					</label>

					<button className="button" type="submit">
						<span>SIGN UP NOW</span>
					</button>

					<div className="info">
						Already have an account? <Link to="/login">Login</Link> instead.
					</div>



				{/* messages  */}
				{loading && showLoading(loading)}
				{error && showError(error)}
				{success && showSuccess(success)}




				</form>




				{/* {console.log("error here: ", error)}
				{console.log("current user: ", currentUser)} */}





			</div>
		</div>
	);
};

export default SignUp;
