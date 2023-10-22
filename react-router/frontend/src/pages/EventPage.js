import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventPage = () => {
  const { eventsList } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={eventsList}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventPage;

const loadEvents = async () => {
  let response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      {
        message: "Error while fetching events data!",
      },
      { status: 500 }
    );
  } else {
    const data = await response.json();
    return data.events;
  }
};

export const loader = () => {
  return defer({
    //loadEvents must return promise
    eventsList: loadEvents(),
  });
};
