import React from "react"
import axios from 'axios'
import strip from './../strip.jsx'
import "./event.css"

const Event = props => {
    props.event.refresh = props.refresh;

    return (
        <div className="event" onClick={() => props.setPopup(props.event)}>
            <div className="description-area">
                <p className="description" id={"description:"+props.event._id}>{props.event.description}</p>
            </div>
            <div className="date-values">
                <p className="values" id={"starthour:"+props.event._id}>Começa: {props.event.startHour}</p>
                <p className="values" id={"startdate:"+props.event._id}>{props.event.startDate}</p>
            </div>
            <div className="date-values">
                <p className="values" id={"endhour:"+props.event._id}>Termina: {props.event.endHour}</p>
                <p className="values" id={"enddate:"+props.event._id}>{props.event.endDate}</p>
            </div>
        </div>
    )
}


export default Event