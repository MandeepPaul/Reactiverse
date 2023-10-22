import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./layout/RootPage";
import EventRootLayout from "./layout/EventRootLayout";

import EventPage, { loader as EventsLoader } from "./pages/Eventpage";
import EventDetail, { loader as EventDetailLoader } from "./pages/EventDetail";

import { action as EventDeleteAction } from "./pages/EventDetail";
import { action as changeEventAction } from "./components/EventForm";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventRootLayout />,
          children: [
            { index: true, element: <EventPage />, loader: EventsLoader },
            {
              path: ":eventId",
              id: "event-details",
              loader: EventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                  action: EventDeleteAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: changeEventAction,
                },
              ],
            },

            {
              path: "new",
              element: <NewEventPage />,
              action: changeEventAction,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
