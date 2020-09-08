import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import  useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const {mode , transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  const cancel = function() {
    back();
  }

  function save(name, interviewer) {
    console.log("this is save name: ", name);
    console.log("this is the save interviewer: ", interviewer);
    
    //new interview object which is passed to props.bookInterview
    const interview = {
      student: name,
      interviewer
    };
    //passing the object interview (which is holding the inputted student name and interviewer choice) to bookInterview
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => {
        // props.onAdd()
        transition(CREATE)
      }}/>}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          //I had a bookinterview here before that a mentor deleted
          onSave={save}
          onCancel={cancel}
        />
      )}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
    </article>
  );
}