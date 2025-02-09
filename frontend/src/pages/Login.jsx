import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await login(formData);
			localStorage.setItem("token", res.data.token);
			alert("Logged in successfully!");
			navigate("/");
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-yellow-50 p-6">
			<div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-yellow-200">
				<h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">
					Login
					<span className="block w-16 h-1 bg-green-500 mx-auto mt-2 rounded"></span>
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="relative">
						<Mail
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
							size={20}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							required
							className="w-full p-3 pl-10 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white shadow-sm"
						/>
					</div>

					<div className="relative">
						<Lock
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
							size={20}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							required
							className="w-full p-3 pl-10 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white shadow-sm"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
					>
						Login
					</button>

					<p className="text-center text-gray-600 mt-4">
						Don't have an account?
						<Link
							to="/register"
							className="text-green-600 font-semibold hover:underline"
						>
							{" "}
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
