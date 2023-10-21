import { useParams } from "react-router-dom";
// import EventItem from "../components/EventItem";

const EventDetail = () => {
  const params = useParams();
  return (
    <>
      <h1>Event {params.eventId}</h1>
    </>
  );
};

export default EventDetail;
