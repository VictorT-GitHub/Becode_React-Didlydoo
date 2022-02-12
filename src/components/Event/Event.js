import React from "react";

import EventBtns from "./EventBtns/EventBtns";
import SectionGrid from "./SectionGrid/SectionGrid";

const Event = ({
  // -- Props --
  event,
  fetchGetEvents,
  dateInputs,
  nameRef,
  dateRef,
  authorRef,
  descriptionRef,
  eventsList,
  setEventsList,
}) => {
  // -- JSX --
  return (
    <li className="eventContainer">
      <section>
        <div className="btnsNameAuthorContainer">
          <h3>
            {event.name} by {event.author}
          </h3>

          <EventBtns
            event={event}
            fetchGetEvents={fetchGetEvents}
            dateInputs={dateInputs}
            nameRef={nameRef}
            dateRef={dateRef}
            authorRef={authorRef}
            descriptionRef={descriptionRef}
            eventsList={eventsList}
            setEventsList={setEventsList}
          />
        </div>

        <p>{event.description}</p>
      </section>

      <SectionGrid event={event} fetchGetEvents={fetchGetEvents} />
    </li>
  );
};

export default Event;
