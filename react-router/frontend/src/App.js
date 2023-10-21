import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./layout/RootPage";
import EventRootLayout from "./layout/EventRootLayout";

import EventPage, { loader as EventsLoader } from "./pages/EventPage";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import EventDetail from "./pages/EventDetail";
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
            { path: ":eventId", element: <EventDetail /> },
            { path: ":eventId/edit", element: <EditEventPage /> },
            { path: "new", element: <NewEventPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
