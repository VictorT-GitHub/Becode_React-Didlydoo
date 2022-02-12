import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostAttendees = ({ event, fetchGetEvents }) => {
  // -- Data Manipulation --
  const newDatesArray = [];
  // We cannot keep "attendees" field for postNewAttendees()
  event.dates.forEach((date) => {
    const newDateObject = {};
    newDateObject.date = date.date;
    newDatesArray.push(newDateObject);
  });

  // -- Functions --
  const postNewAttendees = async () => {
    await fetch(`http://localhost:9000/api/events/${event.id}/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username.current.value,
        dates: attendDates,
      }),
    });

    setAttendDates(newDatesArray);

    fetchGetEvents();
  };

  const handleAvailabilityYES = (date) => {
    const newAttDates = [...attendDates];
    const attdate = newAttDates.find((attendDate) => attendDate.date === date);
    attdate.available = true;
    setAttendDates(newAttDates);
  };

  const handleAvailabilityNO = (date) => {
    const newAttDates = [...attendDates];
    const attdate = newAttDates.find((attendDate) => attendDate.date === date);
    attdate.available = false;
    setAttendDates(newAttDates);
  };

  // -- UseRef --
  const username = useRef();

  // -- useState --
  const [attendDates, setAttendDates] = useState(newDatesArray);

  // -- JSX --
  return (
    <>
      <div className="sendBtnAndInputNameDiv flexCenter">
        <input type="text" placeholder="User name" ref={username} />
        <button className="sendBtn" onClick={postNewAttendees}>
          Send
        </button>
      </div>

      {event.dates.map((date) => (
        <div key={uuidv4()} className="inputsBtns flexCenter">
          <button
            className="avBtn"
            onClick={() => handleAvailabilityYES(date.date)}
          ></button>

          <button
            className="avBtn"
            onClick={() => handleAvailabilityNO(date.date)}
          ></button>
        </div>
      ))}
    </>
  );
};

export default PostAttendees;
