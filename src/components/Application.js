// import React from "react";
import React, { useState, useEffect } from "react";


import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import "components/Appointment";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "components/helpers/selectors";


const axios = require('axios');

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  function bookInterview(id, interview) {
      
      // console.log("this is state.appointments: ", state.appointments[id]);
      //Gets correct id (student name) and interviewer id from save function when saving appointment
      // console.log("this is id, interview inside of bookInterview Function: ", id, interview);


      //Bottom layer
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      
      
      //Holding the new interview as an object at the bottom of appointment 
      console.log("this is appointment: ", appointment);
      
      //Up one layer
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      //Top Level, calling setState with the new state object
      setState({
        ...state,
        appointments
      });   
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
            const interviewers = getInterviewersForDay(state, state.day);            
            return (
                <Appointment
                  key={appointment.id}
                  {...appointment}
                  interviewers={interviewers}
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
