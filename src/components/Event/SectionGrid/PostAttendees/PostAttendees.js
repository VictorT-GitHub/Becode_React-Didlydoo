import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostAttendees = ({ event, fetchGetEvents }) => {
  // -- Data Manipulation --
  // We cannot keep "attendees" field for postNewAttendees() fetch
  const newDatesArray = [];
  event.dates.forEach((date) => {
    const newDateObject = {};
    newDateObject.date = date.date;
    newDatesArray.push(newDateObject);
  });

  // -- UseRef --
  const username = useRef();

  // -- useState --
  const [attendDates, setAttendDates] = useState(newDatesArray);

  // -- Functions & Fetch --
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

    username.current.value = ""; // Reset username input value

    setAttendDates(newDatesArray); // Reset availabity array

    fetchGetEvents(); // Reset events list & DOM display
  };

  // Availability boolean update
  const handleClick = (e, date, boolean) => {
    e.target.textContent = "x";

    const newAttDates = [...attendDates];
    const attdate = newAttDates.find((attendDate) => attendDate.date === date);
    attdate.available = boolean;
    setAttendDates(newAttDates);
  };

  // Btns textContent update
  const handleClickDOM = (e) => {
    e.target.textContent = "x";
    console.log(e.target.textContent);
  };

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
            onClick={(e) => handleClick(e, date.date, true)}
          ></button>

          <button className="avBtn" onClick={handleClickDOM}></button>
        </div>
      ))}
    </>
  );
};

export default PostAttendees;
