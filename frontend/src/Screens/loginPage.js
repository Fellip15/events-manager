import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Navbar from "../Components/navbar";
import "./css/loginPage.css"

function LoginPage() {
    const [cookies, setCookie] = useCookies(["user"]);
    const [email, setEmail] = useState(null);

    const [message, setMessage] = useState(null);

    const location = useLocation();
    console.log(location.state)
    if (location.state && location.state.unauthorized) {
        setMessage("Você precisa estar logado para acessar essa função.")
        location.state.unauthorized = false;
    }

    async function logar(e) {
        e.preventDefault();
        let email = document.querySelector("#email").value;
        let senha = document.querySelector("#senha").value;

        axios.post('http://localhost:5300/api/users/logar', {
            email: email, 
            senha: senha
        }).then(response => {
            console.log(response);
            setEmail(response.data.email);
            setCookie('user', response.data.token);
        }).catch(erro => setMessage(erro.response.data));
    }

    return (
    <>
    <Navbar/>
    <div className="LoginPageBody">
        {email && <Navigate to="/myEvents"/>}
        <form className="login-form">
        <h2>Entrar</h2>
        <label>Email:</label>
        <input id="email" type="email" placeholder="email"/>
        <label>Senha:</label>
        <input id="senha" type="password" placeholder="password"/>
        <button onClick={logar}>Login</button>
        {message && <p>{message}</p>}
        <Link to="/register" className="login-link-register">Não possui cadastro?</Link>
        </form>
    </div>
    </>
    );
}

export default LoginPage;