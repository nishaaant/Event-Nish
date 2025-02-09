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
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">All Events</h2>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Back to Home Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate("/")} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default EventList;
