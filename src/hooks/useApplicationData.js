import React, { useState, useEffect } from "react";

const axios = require('axios');

export default function useApplicationData() {

  const setDay = day => setState({ ...state, day });

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });  

  function updateSpots(increment) {
    const day = state.days.find((item) => item.name === state.day)
    day.spots += increment;
    return state.days;
  }
  
  function saveInterview(id, interview)  {
    console.log(state);
    //Bottom layer
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //Up one layer
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const url = `/api/appointments/${id}`;
    const promise = axios
        .put(url, appointment)
        .then(() => {
          const days = updateSpots(-1);
          setState({...state, appointments, days});
        });
    return promise;  
  };

  function cancelInterview(id) {
    const appointments = state.appointments;
    const appointment = appointments[id];


    const url = `/api/appointments/${id}`;
      const promise = axios
          .delete(url)
          .then(() => {
            appointment.interview = null;
            const days = updateSpots(1);
            setState({...state, appointments, days});
          });
      return promise; 
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);


  return { state, setDay, saveInterview, cancelInterview }
}