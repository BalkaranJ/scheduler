const { default: Appointment } = require("components/Appointment");

export function getAppointmentsForDay(state, day) {
  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      const appointmentIds = currentDay.appointments;
      const appointments = appointmentIds.map((id) => {
        return (
          state.appointments[id]
        );
      })
      return appointments;
    };
  }
  return [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewerObject = state.interviewers[interview.interviewer];

    const newInterview = {
      "student": interview.student,
      "interviewer": interviewerObject
    };
    return newInterview;
  }

}

export function getInterviewersForDay(state, day) {
  for (let currentDay of state.days) {    
    if (currentDay.name === day) {
      const interviewersArray = currentDay.interviewers;
      const interviewers = interviewersArray.map((id) => {                
        return (
          state.interviewers[id]          
        );
      })
      return interviewers;
    };
  }
  return [];
}