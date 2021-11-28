import React from "react";

const DateInputs = ({ id, dateInputs, setDateInputs }) => {
  // ---------- FUNCTIONS ----------
  const deleteDateInput = (e) => {
    e.preventDefault();
    const newDateInputs = dateInputs.filter((dateInput) => dateInput.id !== id);
    setDateInputs(newDateInputs);
  };

  const inputDateHandler = (e) => {
    const newDateInputs = dateInputs;
    const elemToChange = newDateInputs.find((dateInput) => dateInput.id === id);
    elemToChange.date = e.target.value;
    setDateInputs(newDateInputs);
  };

  // ---------- JSX ----------
  return (
    <div>
      <input
        className="newEventDates"
        type="date"
        onChange={inputDateHandler}
      />
      <button className="deleteDateBtn" onClick={deleteDateInput}>
        x
      </button>
    </div>
  );
};

export default DateInputs;
