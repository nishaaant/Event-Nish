import { useEffect, useState } from "react";
import { fetchEvents } from "../api";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetchEvents();
      setEvents(res.data);
    };
    getEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="border p-3 rounded">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
