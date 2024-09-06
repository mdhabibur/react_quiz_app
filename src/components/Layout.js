import React from "react";
import Navbar from "./Navbar";


const Layout = ({ children }) => {
	return (
		<>
			<Navbar />

			<main className="main">
				<div className="container">{children}</div>
			</main>
		</>
	);
};

export default Layout;
