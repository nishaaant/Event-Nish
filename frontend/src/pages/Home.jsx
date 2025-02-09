import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
			<h1 className="text-4xl font-extrabold text-zinc-900 text-center mb-8 relative">
				Event Management Platform
				<span className="block w-20 h-1 bg-green-500 mx-auto mt-2 rounded"></span>
			</h1>

			<div className="w-full max-w-lg">
				<EventForm />
			</div>

			<div className="mt-8">
				<button
					onClick={() => navigate("/events")}
					className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
				>
					View Events
				</button>
			</div>
		</div>
	);
};

export default Home;
