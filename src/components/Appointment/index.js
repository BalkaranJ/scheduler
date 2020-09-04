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
    
    
    const interview = {
      student: name,
      interviewer
    };
    return interview;
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
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={cancel}
        />
      )}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
    </article>
  );
}