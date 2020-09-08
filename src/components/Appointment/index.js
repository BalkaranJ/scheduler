import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import  useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const {mode , transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  const cancel = function() {
    back();
  }

  function doSave(name, interviewer) {
    console.log("this is save name: ", name);
    console.log("this is the save interviewer: ", interviewer);
    
    //new interview object which is passed to props.bookInterview
    const interview = {
      student: name,
      interviewer
    };
    //passing the object interview (which is holding the inputted student name and interviewer choice) to bookInterview
    transition(SAVING);
    props.saveInterview(props.id, interview).then(() => {transition(SHOW)});
  }

  function doDelete() {
    transition(DELETING);
    const promise = props.cancelInterview(props.id);
    promise.then(() => {transition(EMPTY)});
  }

  function doEdit() {
    transition(EDIT);
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
          onEdit={doEdit}
          onDelete={doDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={doSave}
          onCancel={cancel}
        />
      )}
      {mode === SAVING && (<Status message="SAVING"/>)}
      {mode === DELETING && (<Status message="DELETING"/>)}
      {mode === EDIT && (
        <Form
        interviewer={props.interview.interviewer.id}
        name={props.interview.student}
        interviewers={props.interviewers}
        onSave={doSave}
        onCancel={cancel}
        />
      )}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
    </article>
  );
}