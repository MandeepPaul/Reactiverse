import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { queryClient, fetchEvent, deleteEvent } from "../../util/http";

import Header from "../Header.jsx";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal";

export default function EventDetails() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [isDeleting, setDeleting] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { event: id }],
    queryFn: ({ signal }) => fetchEvent({ id: id, signal }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: deleteFlag,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none", // Just to make sure when we call invalidateQueries, these existing queries wont get trigger immediately.
      }),
        navigate("..");
    },
  });

  let content;

  if (isPending) content = <LoadingIndicator />;

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch event data!"}
      />
    );
  }

  const deleteEventHandler = () => {
    mutate({ id: id });
  };

  const setDelete = () => {
    setDeleting(true);
  };

  const cancelDelete = () => {
    setDeleting(false);
  };

  return (
    <>
      {isDeleting && (
        <Modal onClose={cancelDelete}>
          <h2>Are you sure?</h2>
          <p>Action cannot be undone!</p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, Please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button className="button-text" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="button" onClick={deleteEventHandler}>
                  Delete
                </button>
              </>
            )}
          </div>
          {deleteFlag && (
            <ErrorBlock
              title="An error occurred while deleting"
              message={
                deleteError.info?.message || "Failed to delete this event!"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {!data && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <span>{content}</span>
        </div>
      )}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={setDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time
                  dateTime={`Todo-DateT$Todo-Time`}
                >{`${data.date} && ${data.time}`}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
