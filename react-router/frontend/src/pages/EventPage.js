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
    throw new Response(
      JSON.stringify({ message: "Error while fetching events data!" }),
      { status: 500 }
    );
  } else {
    return response;
  }
};

export default EventPage;
