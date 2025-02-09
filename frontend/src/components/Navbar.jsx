import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="bg-gradient-to-r from-yellow-400 to-green-500 text-white p-5 shadow-lg">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<Link
					to="/"
					className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-green-800 transition-all duration-300"
				>
					Event Manager
				</Link>

				<div className="space-x-4">
					{token ? (
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-xl transform transition-all"
						>
							Logout
						</button>
					) : (
						<>
							<Link
								to="/login"
								className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-xl transform transition-all"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-xl transform transition-all"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
