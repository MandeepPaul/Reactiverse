import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  // const { state } = useNavigation();
  const params = useParams();
  const id = params.id;

  // const submit = useSubmit();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { event: id }],
    queryFn: ({ signal }) => fetchEvent({ id: id, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["events", { event: id }] }); //Making sure id we have any outgoing request for that key, those queries would be cancle to prevent clashing.

      const prevEvent = queryClient.getQueryData(["events", { event: id }]);

      queryClient.setQueryData(["events", { event: id }], data.event);
      return { prevEvent };
    },
    onError: (context) => {
      queryClient.setQueryData(["events", { event: id }], context.prevEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  function handleSubmit(formData) {
    // submit(formData, { method: "PUT" });
    mutate({ id: id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending)
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Loading Failed!"
          message={error.info?.message || "Failed to load event."}
        />
        <div className="form-actions">
          <Link to=".." className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// export const loader = ({ params }) => {
//   return queryClient.fetchQuery({
//     queryKey: ["events", { event: params.id }],
//     queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
//   });
// };

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   console.log(formData);
//   const updatedEventData = Object.fromEntries(formData);
//   console.log(updatedEventData);

//   await updateEvent({ id: params.id, event: updatedEventData });
//   await queryClient.invalidateQueries(["events"]);
//   return redirect("../");
// }
