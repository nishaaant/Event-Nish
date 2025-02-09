import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management Platform</h1>
      
      {/* Event Creation Form */}
      <EventForm />

      {/* Button to navigate to Event List */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate("/events")} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Events
        </button>
      </div>
    </div>
  );
};

export default Home;
