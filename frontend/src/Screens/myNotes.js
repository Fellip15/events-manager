import axios from "axios";
import { Link, useNavigate  } from "react-router-dom"
import { useState, useEffect } from 'react'
import { register } from "../Actions/userActions";
import { useCookies } from "react-cookie";
import Lista from "../Components/listEvents"
import Popup from "../Components/popup";
import "./css/myEvents.css";

function MyNotes() {
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [popup, setPopup] = useState(null);

    const [currState, setState] = useState({ 'events' : [], 'pulledEvents' : false });

    const navigate = useNavigate ();
    useEffect(() => {
        async function fetchData() {
            if (!cookies.user) {
                navigate("/login");
            } else {
                await axios.post("http://localhost:5300/api/users/token", {token: cookies.user})
                .then(res => {
                    setEmail(res.data.email);
                    setId(res.data.id);
                });
            }
        } 
        fetchData();
    }, [])

    function changePulledEvents() {
        let stateCopy = JSON.parse(JSON.stringify(currState));
        stateCopy.pulledEvents = false;
        setState(stateCopy);
    }

    function listas() {
        return (<Lista key={id} id={id} refresh={changePulledEvents} setPopup={setPopup}/>)
    }

    function logout() {
        removeCookie('user');
        navigate('/login');
    }

    function closePopup() {
        setPopup(null);
        console.log(popup);
    }

    return (
    <div className="MyEventsBody">
        {popup && <Popup refresh={changePulledEvents} event={popup} closePopup={closePopup}/>}
        <header id="myevents-nav-bar">
            <div>Bem vindo(a), {email.split("@")[0]}</div>
            <button id="myevents-logout" onClick={logout}>Logout</button>
        </header>
        {id && listas()}
    </div>
    );
}

export default MyNotes;