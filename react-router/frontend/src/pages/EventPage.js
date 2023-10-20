import EventsList from "../components/EventsList";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Halloween",
  },
  {
    id: "e2",
    title: "Christman",
  },
  {
    id: "e3",
    title: "New Year",
  },
];
const EventPage = () => {
  return (
    <>
      <EventsList events={DUMMY_EVENTS} />
    </>
  );
};

export default EventPage;
