import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management Platform</h1>
      <EventForm />
      <div className="mt-6">
        <EventList />
      </div>
    </div>
  );
};

export default Home;
