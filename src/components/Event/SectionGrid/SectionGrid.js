import React from "react";

import PostAttendees from "./PostAttendees/PostAttendees";

const SectionGrid = ({ event, fetchGetEvents }) => {
  // -- Data Manipulation --
  const datesPerAttendees = [];

  event.dates.forEach((date) => {
    date.attendees.forEach((attend) => {
      const elemIndex = datesPerAttendees.findIndex(
        (elem) => elem.name === attend.name
      );

      if (elemIndex !== -1) {
        datesPerAttendees[elemIndex].dates.push({
          date: date.date,
          available: attend.available,
        });
      } else {
        datesPerAttendees.push({
          name: attend.name,
          dates: [
            {
              date: date.date,
              available: attend.available,
            },
          ],
        });
      }
    });
  });

  // -- JSX --
  return (
    <section
      className="bigGrid"
      style={{
        gridTemplateColumns: `repeat(${event.dates.length + 1}, 1fr)`,
      }}
    >
      {/* Empty div for first case of the grid */}
      <div></div>

      {/* Dates on the first row of the grid */}
      {event.dates.map((date) => (
        <h5 key={date.date}>{date.date}</h5>
      ))}

      {/* Attendees and their availabilities */}
      {datesPerAttendees.map((attend) => (
        <>
          <h6>{attend.name}</h6>
          {attend.dates.map((date) => {
            if (date.available === true) {
              return <div className="av greenAv">V</div>;
            } else if (date.available === false) {
              return <div className="av redAv">X</div>;
            } else {
              return <div className="av"></div>;
            }
          })}
        </>
      ))}

      {/* Users inputs (name & availabilities) (Fetch POST-ATTENDEES) */}
      <PostAttendees event={event} fetchGetEvents={fetchGetEvents} />
    </section>
  );
};

export default SectionGrid;
