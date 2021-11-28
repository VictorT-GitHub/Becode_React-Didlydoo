import React from "react";
import SectionGrid from "./SectionGrid/SectionGrid";

const Event = ({ event, fetchGetEvents, dateInputs, dateRef }) => {
  // ---------- FUNCTIONS ----------
  const fetchPatchEvent = () => {};

  const fetchAddDates = () => {
    const dateInputsValues = [];
    dateInputs.map((dateInput) => dateInputsValues.push(dateInput.date));

    fetch(`http://localhost:9000/api/events/${event.id}/add_dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dates: [dateRef.current.value, ...dateInputsValues],
      }),
    }).then(() => fetchGetEvents());
  };

  const fetchDeleteEvent = () =>
    fetch(`http://localhost:9000/api/events/${event.id}`, {
      method: "DELETE",
    }).then(() => fetchGetEvents());

  // ---------- JSX ----------
  return (
    <li className="eventContainer">
      <section>
        <div className="btnsNameAuthorContainer">
          <h3>
            {event.name} by {event.author}
          </h3>

          <div>
            <button className="modifyEventBtn" onClick={fetchPatchEvent}>
              Modify
            </button>
            <button className="addDatesBtn" onClick={fetchAddDates}>
              Add date(s)
            </button>
            <button className="deleteEventBtn" onClick={fetchDeleteEvent}>
              Delete
            </button>
          </div>
        </div>

        <p>{event.description}</p>
      </section>

      <SectionGrid event={event} />
    </li>
  );
};

export default Event;
