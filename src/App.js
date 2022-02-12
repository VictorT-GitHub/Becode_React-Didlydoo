import "./app.css";
import React, { useState, useEffect, useRef } from "react";

import Form from "./components/Form/Form";
import Event from "./components/Event/Event";

function App() {
  // -- useRef --
  const nameRef = useRef();
  const dateRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();

  // -- useState --
  const [eventsList, setEventsList] = useState([]);
  const [dateInputs, setDateInputs] = useState([]);

  // -- useEffect --
  useEffect(() => fetchGetEvents(), []);

  // -- Functions --
  // Function Fetch GET all events -> trigger setEventsList() useState
  const fetchGetEvents = () => {
    fetch("http://localhost:9000/api/events")
      .then((res) => res.json())
      .then((data) => setEventsList(data));
  };

  // -- JSX --
  return (
    <>
      <header>
        <h1>Didlydoo</h1>
      </header>

      <main>
        <Form
          dateInputs={dateInputs}
          setDateInputs={setDateInputs}
          fetchGetEvents={fetchGetEvents}
          nameRef={nameRef}
          dateRef={dateRef}
          authorRef={authorRef}
          descriptionRef={descriptionRef}
        />

        <ul id="allEventsContainer">
          {eventsList.map((event) => (
            <Event
              key={event.id}
              event={event}
              fetchGetEvents={fetchGetEvents}
              dateInputs={dateInputs}
              setDateInputs={setDateInputs}
              nameRef={nameRef}
              dateRef={dateRef}
              authorRef={authorRef}
              descriptionRef={descriptionRef}
              eventsList={eventsList}
              setEventsList={setEventsList}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
