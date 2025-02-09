import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../api";

const EventList = () => {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getEvents = async () => {
			const res = await fetchEvents();
			setEvents(res.data);
		};
		getEvents();
	}, []);

	return (
		<div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
			<h2 className="text-3xl font-extrabold text-zinc-700 text-center mb-6 relative">
				All Events
				<span className="block w-16 h-1 bg-green-500 mx-auto mt-2 rounded"></span>
			</h2>

			<ul className="w-full max-w-2xl space-y-6">
				{events.map((event) => (
					<li
						key={event._id}
						className="p-5 bg-white border border-yellow-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
					>
						<h3 className="text-2xl font-bold text-zinc-700 mb-2">
							{event.title}
						</h3>
						<p className="text-gray-700">{event.description}</p>
						<p className="text-sm text-gray-600 mt-2">
							📅 {new Date(event.date).toLocaleString()}
						</p>
					</li>
				))}
			</ul>

			<div className="mt-8">
				<button
					onClick={() => navigate("/")}
					className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
				>
					Back to Home
				</button>
			</div>
		</div>
	);
};

export default EventList;
