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

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Archie Cohen",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Balkaran Jaswal",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Barinder Sidhu",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 6,
//     time: "5pm",
//     interview: {
//       student: "Lei Fu",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // useEffect(() => {
  //   axios
  //     .get(`/api/days`)
  //     .then((response) => {
  //       setState(prev => ({...prev, days: response.data}));      
  //     })

  //   axios
  //     .get(`/api/appointments`)
  //     .then((response) => {
  //       setState(prev => ({...prev, appointments: response.data}))
  //     })

  // }, [])

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
