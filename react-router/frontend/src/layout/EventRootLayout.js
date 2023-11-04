import { Outlet } from "react-router-dom";
import EventNavigation from "../components/EventsNavigation";

const RootPage = () => {
  return (
    <>
      <EventNavigation />
      <Outlet />
    </>
  );
};

export default RootPage;
