import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    // if (replace === false) {

    //   const newHistory = [...history];
    //   newHistory.push(newMode);      
    //   setMode(newMode);
    //   setHistory(newHistory);

    // } else {
    //   const newHistory = [...history];
    //   newHistory.pop();
    //   newHistory.push(newMode);      
    //   setMode(newMode);
    //   setHistory(newHistory);
    // }
    
    const newHistory = [...history];
    if (replace) {newHistory.pop();}
    newHistory.push(newMode);      
    setMode(newMode);
    setHistory(newHistory);


  }

  function back() {

    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const newMode = newHistory[newHistory.length - 1];
      setMode(newMode);
      setHistory(newHistory);

    } else {
      return undefined;
    }


  }

  return { mode, transition, back }
}
