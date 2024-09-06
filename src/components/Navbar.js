import React from "react";
import logoBg from "../images/logo-bg.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const { logOut, currentUser } = useAuth();

	//handle logout
	const handleLogout = async () => {
		try {
			await logOut();
			console.log("logged out");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="nav">
			<ul>
				<li>
					<Link to="/" className="brand">
						<img src={logoBg} alt="Learn with Sumit Logo" />
						<h3>Learn with Sumit</h3>
					</Link>
				</li>
			</ul>
			<div className="account">
				<span className="material-icons-outlined" title="Account">
					{" "}
					account_circle{" "}
				</span>

				{currentUser ? (
					<>
						<Link to="/">Home</Link>
						{/* <Link to="/quiz">Quiz</Link> */}
						<Link to="/login" onClick={handleLogout}>
							Logout
						</Link>
            <Link to="/login" onClick={handleLogout}>
              <span className="material-icons-outlined" title="Logout">
							{" "}
							logout{" "}
						</span>
						</Link>

					</>
				) : (
					<>
						<Link to="/signup">Signup</Link>
						<Link to="/login">Login</Link>
					</>
				)}


			</div>
		</nav>
	);
};

export default Navbar;
