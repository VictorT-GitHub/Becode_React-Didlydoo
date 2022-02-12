import React from "react";
import { v4 as uuidv4 } from "uuid";

import DateInputs from "./DateInputs/DateInputs";

const Form = ({
  // -- Props --
  dateInputs,
  setDateInputs,
  fetchGetEvents,
  nameRef,
  dateRef,
  authorRef,
  descriptionRef,
}) => {
  // -- Functions --
  const addDateInput = (e) => {
    e.preventDefault();
    setDateInputs([...dateInputs, { id: uuidv4() }]);
  };

  const fetchPostEvent = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value &&
      dateRef.current.value &&
      authorRef.current.value &&
      descriptionRef.current.value
    ) {
      const dateInputsValues = [];
      dateInputs.map((dateInput) => dateInputsValues.push(dateInput.date));

      fetch("http://localhost:9000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          dates: [dateRef.current.value, ...dateInputsValues],
          author: authorRef.current.value,
          description: descriptionRef.current.value,
        }),
      }).then(() => fetchGetEvents());
    }
  };

  // -- JSX --
  return (
    <form
      className="flexCenter"
      id="newEventForm"
      action=""
      onSubmit={fetchPostEvent}
    >
      <input
        ref={nameRef}
        id="newEventName"
        type="text"
        placeholder="Event name"
      />

      <div id="dateInputsContainer">
        <div>
          <input
            ref={dateRef}
            id="inputDateOriginel"
            className="newEventDates"
            type="date"
          />

          <button id="addDatesBtn" onClick={addDateInput}>
            +
          </button>
        </div>

        {dateInputs.map((dateInput) => (
          <DateInputs
            key={dateInput.id}
            id={dateInput.id}
            dateInputs={dateInputs}
            setDateInputs={setDateInputs}
          />
        ))}
      </div>

      <input
        ref={authorRef}
        id="newEventAuthor"
        type="text"
        placeholder="Author"
      />

      <input
        ref={descriptionRef}
        id="newEventDescription"
        type="text"
        placeholder="Description"
      />

      <input id="newEventSubmit" type="submit" value="" />
    </form>
  );
};

export default Form;
