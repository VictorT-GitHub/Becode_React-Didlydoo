import React from "react";

const SectionGrid = ({ event }) => {
  // ---------- DATA MANIPULATION ----------
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

  console.log(datesPerAttendees);

  // ---------- JSX ----------
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
      <div className="sendBtnAndInputNameDiv flexCenter">
        <input type="text" placeholder="User name" />
        <button className="sendBtn">Send</button>
      </div>

      {event.dates.map((date) => (
        <div className="inputsBtns flexCenter">
          <button className="avBtn"></button>
          <button className="avBtn"></button>
        </div>
      ))}
    </section>
  );
};

export default SectionGrid;
