import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import Event from "./components/Event/Event";
import "./app.css";

function App() {
  // USE-STATE
  const [eventsList, setEventsList] = useState([]);

  // USE-EFFECT (FETCH GET) (UPDATE [eventsList])
  useEffect(() => {
    fetch("http://localhost:9000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let fetchEventsArray = [];
        data.map((event) => fetchEventsArray.push(event));
        setEventsList(fetchEventsArray);
      });
  }, []);

  // ---------- JSX ----------
  return (
    <>
      <header>
        <h1>Didlydoo</h1>
      </header>

      <main>
        <Form setEventsList={setEventsList} />

        <ul id="allEventsContainer">
          {eventsList.map((event) => (
            <Event event={event} key={event.id} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
