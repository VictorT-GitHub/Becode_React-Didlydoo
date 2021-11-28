import React from "react";
import SectionGrid from "./SectionGrid/SectionGrid";

const Event = ({ event }) => {
  // ---------- JSX ----------
  return (
    <li className="eventContainer">
      <section>
        <div className="btnsNameAuthorContainer">
          <h3>
            {event.name} by {event.author}
          </h3>

          <div>
            <button className="modifyEventBtn">Modify</button>
            <button className="addDatesBtn">Add date(s)</button>
            <button className="deleteEventBtn">Delete</button>
          </div>
        </div>

        <p>{event.description}</p>
      </section>

      <SectionGrid event={event} />
    </li>
  );
};

export default Event;
