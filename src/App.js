import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Formik } from "formik";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 3),
  },
  {
    title: "Vacation",
    start: new Date(2022, 9, 6),
    end: new Date(2022, 9, 8),
  },
  {
    title: "Conference",
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 17),
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Calendar Timeline Schedule</h1>
      <Formik>
        <div style={{ marginRight: "80%", position:'fixed' }}>
          <h2>Schedule New Event</h2>
          <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <button class="custom-btn btn-1" stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      </Formik>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px", width: "60%", marginLeft: "30%" }}
      />
    </div>
  );
}

export default App;
