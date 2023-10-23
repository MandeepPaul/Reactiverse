import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetail = () => {
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading Event Detail...</p>
        }
      >
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Events...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetail;

const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch details for selected event!",
      },
      { status: 500 }
    );
  } else {
    const data = await response.json();
    return data.event;
  }
};

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

export const loader = async ({ params }) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export const action = async ({ params, request }) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not delete the selected event!",
      },
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
};
