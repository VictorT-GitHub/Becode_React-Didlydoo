import React from "react";

const EventBtns = ({
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
  // -- Functions --
  const fetchPatchEvent = async () => {
    const dataRaw = {
      name: nameRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
    };

    // Data ready to go === data not empty (!== "")
    const dataReadyToGo = {};
    for (const key in dataRaw) {
      if (dataRaw[key].trim().length > 0) dataReadyToGo[key] = dataRaw[key];
    }

    await fetch(`http://localhost:9000/api/events/${event.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataReadyToGo),
    });

    fetchGetEvents();
  };

  const fetchAddDates = async () => {
    const dateInputsValues = [];
    dateInputs.map((dateInput) => dateInputsValues.push(dateInput.date));

    await fetch(`http://localhost:9000/api/events/${event.id}/add_dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dates: [dateRef.current.value, ...dateInputsValues],
      }),
    });

    fetchGetEvents();
  };

  const fetchDeleteEvent = async (id) => {
    await fetch(`http://localhost:9000/api/events/${event.id}`, {
      method: "DELETE",
    });

    // -- Dont need to fetch here --
    // fetchGetEvents();
    const newEventsList = eventsList.filter((event) => event.id !== id);
    setEventsList(newEventsList);
  };

  // -- JSX --
  return (
    <div>
      <button className="modifyEventBtn" onClick={fetchPatchEvent}>
        Modify
      </button>

      <button className="addDatesBtn" onClick={fetchAddDates}>
        Add date(s)
      </button>

      <button
        className="deleteEventBtn"
        onClick={() => fetchDeleteEvent(event.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default EventBtns;
