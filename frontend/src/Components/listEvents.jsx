import React, { useState } from "react"
import Event from "./event";
import axios from 'axios'
import "./listEvents.css"

const Lista = props => {
    const [currState, setState] = useState({"events":[], "pulledEvents":false});

    function getDate() {
        var date = new Date();
        var year= date.getFullYear();

        var month = date.getMonth()+1;
        if(month<10)
            month="0"+month;

        var day = date.getDate();
        if(day<10)
            day = "0"+day;

        return year+"-"+month+"-"+day;
    }

    async function addEmptyEvent() {
        const date = getDate();
        console.log(date);
        await axios.post('http://localhost:5300/myNotes/' + props.id, {
            description:"Novo evento",
            startDate: date,
            startHour: "00:00:00",
            endDate: date,
            endHour: "00:00:00"
        })
        let stateCopy = JSON.parse(JSON.stringify(currState));
        stateCopy.pulledEvents = false;
        setState(stateCopy);
    }

    function events() {
        if (currState.events.length <= 0) return <p>Você não possui eventos</p>;

        currState['events'].sort(function(a,b){
            const dateA = new Date(a.startDate + " " + a.startHour);
            const dateB = new Date(b.startDate + " " + b.startHour);
            return dateA - dateB;
        });
        
        return currState['events'].map(event => <Event key={event._id} event={event} refresh={changePulledEvents} setPopup={props.setPopup}/>);
    }     

    function changePulledEvents() {
        let stateCopy = JSON.parse(JSON.stringify(currState));
        stateCopy.pulledEvents = false;
        setState(stateCopy);
    }

    if (!currState["pulledEvents"]) {
        axios.get('http://localhost:5300/myNotes/' + props.id)
            .then(function (response) {
                setState({
                    ...currState,
                    events: response ? response.data : [],
                    pulledEvents: true
                })
            })
            .catch(e => console.log("No cards to pull"));
    }

    return (
        <div className="eventsList">
            <button id="newEventButton" onClick={addEmptyEvent}>Adiciona evento</button>
            <div className="eventsContainer">
                {events()}
            </div>
        </div>
    )
}

export default Lista