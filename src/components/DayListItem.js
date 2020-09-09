import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = function(spots) {
    return `${spots ? spots : 'no'} ${spots === 1 ? 'spot' : 'spots'} remaining`;
  }

  const dayClass = classNames("day-list__item", {
    // "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  

  return (
    <li data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}
/*  Display the name of the day, where it is selected or unselected, and the interview spots remaining
    User must also be able to select a particular day to view the interview information for that day

    the following props are available: (I think)

    name:String the name of the day
    spots:Number the number of spots remaining
    selected:Boolean true or false declaring that this day is selected
    setDay:Function accepts the name of the day ex: "Monday", "Tuesday"
    
    spots prop is used for two purposes, to display the text "{props.spots} spots remaining" and to determine if the day is full 
*/