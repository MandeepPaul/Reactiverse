import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventPage = () => {
  const data = useLoaderData();

  return (
    <>
      <EventsList events={data.events} />
    </>
  );
};

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
  } else {
    return response;
  }
};

export default EventPage;
