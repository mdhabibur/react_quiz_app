import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Quiz from "./components/pages/Quiz";
import Result from "./components/pages/Result";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";
import NotFound from "./components/NotFound";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>

          
					<Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

					<Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

					<Route path="/quiz/:id" element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } />

					<Route path="/result/:id" element={
            <PrivateRoute>
            <Result />
          </PrivateRoute>} />

          <Route path="*" element ={<NotFound />} />


				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
