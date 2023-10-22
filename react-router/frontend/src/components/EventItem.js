import { NavLink, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm("This step cannot be undo!");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <NavLink to="edit">Edit</NavLink>
        {/* We can use Form here from react-router-dom to trigger action function but the we wont be able to trigger that startDeleteHandler() */}
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
