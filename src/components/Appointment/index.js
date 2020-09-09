import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";

import  useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";

  const {mode , transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  const cancel = function() {
    back();
  }

  function doSave(name, interviewer) {
    console.log("this is save name: ", name);
    console.log("this is the save interviewer: ", interviewer);
    
    //new interview object which is passed to props.saveInterview
    const interview = {
      student: name,
      interviewer
    };
    //passing the object interview (which is holding the inputted student name and interviewer choice) to saveInterview
    transition(SAVING);
    props.saveInterview(props.id, interview).then(() => {transition(SHOW)}).catch(error => transition(ERROR_SAVE, true));
  }

  function doDelete() {
    transition(DELETING);
    const promise = props.cancelInterview(props.id);
    promise.then(() => {transition(EMPTY)});
    promise.catch(error => transition(ERROR_DELETE, true));
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
          onDelete={() => {transition(CONFIRM)}}
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
      {mode === ERROR_SAVE && (
      <Error
      message="Error Saving Appointment"
      onClose={cancel}
      />)}
      {mode === ERROR_DELETE && (
        <Error
        message="Error Delete Appointment"
        onClose={cancel}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        onCancel={cancel}
        onConfirm={doDelete}
        />
      )}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
    </article>
  );
}