import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace = true) {
      const newMode = mode;   
      history.push(newMode);
      return setMode(newMode);
    }
  }

  function back() {

    if (history.length > 1) {
      history.pop()
      const newHistory = history[history.length - 1]
      return setMode(newHistory);
    } else {
      return undefined;
    }


  }

  return { mode, transition, back }
}
