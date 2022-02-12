import React from "react";

const EventBtns = ({
  // -- Props --
  event,
  fetchGetEvents,
  dateInputs,
  setDateInputs,
  nameRef,
  dateRef,
  authorRef,
  descriptionRef,
  eventsList,
  setEventsList,
}) => {
  // -- Functions & Fetch --
  const fetchPatchEvent = async () => {
    const dataRaw = {
      name: nameRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
    };

    // Data ready to go === data raw not empty (!== "")
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

    nameRef.current.value = "";
    authorRef.current.value = "";
    descriptionRef.current.value = "";

    fetchGetEvents(); // Reset events list & DOM display
  };

  const fetchAddDates = async () => {
    // Data Manipulation (Cannot keep "id" field for the fetch)
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

    dateRef.current.value = "";
    setDateInputs([]); // Reset dates inputs list & DOM display

    fetchGetEvents(); // Reset events list & DOM display
  };

  const fetchDeleteEvent = async (id) => {
    await fetch(`http://localhost:9000/api/events/${event.id}`, {
      method: "DELETE",
    });

    // Reset events list & DOM display (no need to fetch here)
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
