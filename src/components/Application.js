// import React from "react";
import React, { useState, useEffect } from "react";


import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import "components/Appointment";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview } from "components/helpers/selectors";


const axios = require('axios');

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        {<img
           className="sidebar--centered"
           src="images/logo.png"
           alt="Interview Scheduler"
        />} 
        {<hr className="sidebar__separator sidebar--centered" />}
        {<nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>} 
        {<img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />}
      </section>
      <section className="schedule">
        {
          getAppointmentsForDay(state, state.day).map(appointment => {
            const interview = getInterview(state, appointment.interview);
            return (
                <Appointment
                  key={appointment.id}
                  {...appointment}
                  interview={interview}
                  bookInterview={bookInterview}
                />
            )
          })
        }
          <Appointment
          key="last"
          time="6pm"
          />
      </section>
    </main>
  );
}
