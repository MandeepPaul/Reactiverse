import { Outlet, useRouteLoaderData } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation";

function EventsRootLayout() {
  const token = useRouteLoaderData("root");
  return (
    <>
      {token && <EventsNavigation />}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
