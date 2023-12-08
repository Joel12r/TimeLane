import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SideCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar position-fixed">
      <div className="calendar__picture">
        <h3>
          <button className="btn" onClick={prevMonth}>
            {"<"}
          </button>{" "}
          {currentDate.getDate()},{" "}
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            currentDate
          )}{" "}
          {currentDate.getFullYear()}{" "}
          <button className="btn" onClick={nextMonth}>
            {">"}
          </button>
        </h3>
        <h3></h3>
      </div>
      <div className="calendar__date">
        <Calendar value={currentDate} onChange={setCurrentDate} />
      </div>
    </div>
  );
};

export default SideCalendar;
