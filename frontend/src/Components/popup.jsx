import React, { useState } from "react"
import axios from 'axios'
import strip from './../strip.jsx';
import "./popup.css";

const Popup = props => {
    if (!props.event) return (<p>Erro no popup</p>)

    async function removeEvent() {
        console.log("Deleting event " + props.event._id);
        await axios.delete("http://localhost:5300/myNotes/"+props.event._id);
        closePopup();
        props.refresh();
    }

    async function saveEvent() {
        let descriptionVal = document.getElementById("popup-description").innerHTML;
        let startValDate = document.getElementById("popup-startdate").value;
        let startValHour = document.getElementById("popup-starthour").value;
        let endValDate = document.getElementById("popup-enddate").value;
        let endValHour = document.getElementById("popup-endhour").value;

        descriptionVal = await strip(descriptionVal);

        await axios.put("http://localhost:5300/myNotes/"+props.event._id, {
            description:descriptionVal,
            startDate:startValDate,
            startHour:startValHour,
            endDate:endValDate,
            endHour:endValHour
        });

        closePopup();
        props.event.refresh();
    }

    function closePopup() {
        props.closePopup();
        props.event.refresh();
    }

    return (
        <div className="popup-background">
            <div className="popup-body">
                <div className="header-popup">
                    <button className="popup-button save-popup-button" onClick={() => saveEvent()}>salvar</button>
                    <button className="popup-button remove-popup-button" onClick={() => removeEvent()}>apagar</button>
                    <button className="popup-button close-popup" onClick={closePopup}>x</button>
                </div>
                <div id="popup-values">
                    <p contentEditable="true" id="popup-description">{props.event.description}</p>
                    Início:
                    <div id="popup-start-values">
                        <input id="popup-starthour" type="time" defaultValue={props.event.startHour}/>
                        <input id="popup-startdate" type="date" defaultValue={props.event.startDate}/>
                    </div>
                    Término:
                    <div id="popup-end-values">
                        <input id="popup-endhour" type="time"    defaultValue={props.event.endHour}/>
                        <input id="popup-enddate" type="date"   defaultValue={props.event.endDate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup