import { useState } from "react";
import { createEvent } from "../api";
import { CalendarIcon, FileTextIcon, Edit2Icon } from "lucide-react";

const EventForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Please log in first");
			return;
		}
		try {
			await createEvent(formData, token);
			alert("Event created successfully!");
			setFormData({ title: "", description: "", date: "" });
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	return (
		<div className="max-w-md mx-auto p-8 bg-yellow-50 shadow-xl rounded-2xl border border-yellow-200 transform transition-all duration-300 hover:scale-105">
			<h2 className="text-2xl font-bold text-zinc-700 text-center mb-6 relative">
				Create Event
				<span className="block w-16 h-1 bg-green-500 mx-auto mt-2 rounded"></span>
			</h2>

			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="relative">
					<Edit2Icon
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
						size={20}
					/>
					<input
						type="text"
						name="title"
						placeholder="Event Title"
						value={formData.title}
						onChange={handleChange}
						required
						className="w-full p-3 pl-10 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white shadow-sm"
					/>
				</div>


				<div className="relative">
					<FileTextIcon
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
						size={20}
					/>
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
						required
						className="w-full p-3 pl-10 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white shadow-sm"
					/>
				</div>

				<div className="relative">
					<CalendarIcon
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
						size={20}
					/>
					<input
						type="datetime-local"
						name="date"
						value={formData.date}
						onChange={handleChange}
						required
						className="w-full p-3 pl-10 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white shadow-sm"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-1"
				>
					Create Event
				</button>
			</form>
		</div>
	);
};

export default EventForm;
