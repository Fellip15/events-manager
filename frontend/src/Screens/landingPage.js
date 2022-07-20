import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./css/landingPage.css";
import Navbar from "../Components/navbar";

function LandingPage() {
    return (
    <>
    <Navbar/>
    <main className="LandingPageBody">
        <div id="welcome-message">
            <h2 id="titleLanding">Bem vindo(a)</h2>
            <p>Esse site é um gerenciador de eventos, você pode adicionar, remover e editar eles, os quais possuem data de início e final, além de uma descrição.</p>
            <p>Foi desenvolvido como desafio técnico com duração de uma semana e as tecnologias utilizadas foram: React, Node, HTML5 e CSS3</p>
        </div>
    </main>
    <footer id="footer-landingPage">Made by Fellip</footer>
    </>
    );
}

export default LandingPage;