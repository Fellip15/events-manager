import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./css/landingPage.css";
import Navbar from "../Components/navbar";

function LandingPage() {
    return (
    <>
    <Navbar/>
    <div className="LandingPageBody">
        <h2 id="titleLanding">Bem vindo(a)</h2>
    </div>
    </>
    );
}

export default LandingPage;