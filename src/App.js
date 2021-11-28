import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form/Form";
import Event from "./components/Event/Event";
import "./app.css";

function App() {
  // ---------- FUNCTIONS ----------
  // funct: Fetch GET all events -> setEventsList()
  const fetchGetEvents = () => {
    fetch("http://localhost:9000/api/events")
      .then((res) => res.json())
      .then((data) => {
        let fetchEventsArray = [];
        data.map((event) => fetchEventsArray.push(event));
        setEventsList(fetchEventsArray);
      });
  };

  // ---------- USE-REF ----------
  const dateRef = useRef();

  // ---------- USE-STATE ----------
  const [eventsList, setEventsList] = useState([]);
  const [dateInputs, setDateInputs] = useState([]);

  // ---------- USE-EFFECT ----------
  useEffect(() => fetchGetEvents(), []);

  // ---------- JSX ----------
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
          dateRef={dateRef}
        />

        <ul id="allEventsContainer">
          {eventsList.map((event) => (
            <Event
              key={event.id}
              event={event}
              fetchGetEvents={fetchGetEvents}
              dateInputs={dateInputs}
              dateRef={dateRef}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
