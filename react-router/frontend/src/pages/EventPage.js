import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventPage = () => {
  const data = useLoaderData();

  return (
    <>
      <EventsList events={data.events} />
    </>
  );
};

export default EventPage;

export const loader = async () => {
  let response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      {
        message: "Error while fetching events data!",
      },
      { status: 500 }
    );
  } else {
    return response;
  }
};
