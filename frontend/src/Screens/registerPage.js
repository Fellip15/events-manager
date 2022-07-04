import axios from "axios";
import { Link, Navigate  } from "react-router-dom"
import { useState, useEffect } from 'react'
import { register } from "../Actions/userActions";
import { useCookies } from "react-cookie";
import Navbar from "../Components/navbar";
import "./css/registerPage.css"

function RegisterPage({ history }) {
    const [message, setMessage] = useState(null);

    const [cookies, setCookie] = useCookies(["user"]);

    const cadastrar = async (e) => {
        e.preventDefault();
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#senha").value;
        let confirmpassword = document.querySelector("#senhaConf").value;

        if (!email || !password) return alert("Dados incompletos.");

        if (password !== confirmpassword) {
            setMessage("As senhas são diferentes");
            return;
        } 
        
        await axios.post(
            "http://localhost:5300/api/users/cadastrar",
            { email:email, password:password },
        )
        .then(res => {
            setCookie('user', res.data.token.toString());
        }) .catch(e => {
            setMessage(e.response.data);
            console.log(e);
        })
    }

    return (
    <>
    {cookies.user && <Navigate to="/myEvents"/>}
    <Navbar/>
    <div className="RegisterPageBody">
        <form onSubmit={cadastrar} className="register-form">
        <label>Email:</label>
        <input id="email" type="email" placeholder="email"/>
        <label>Senha:</label>
        <input id="senha" type="password" placeholder="password"/>
        <label>Senha de confirmação:</label>
        <input id="senhaConf" type="password" placeholder="confirm password"/>
        <button type="submit">Cadastrar</button>
        {message && <p>{message}</p>}
        <Link to="/login" className="register-link-login">Já possui cadastro?</Link>
        </form>
    </div>
    </>
    );
}

export default RegisterPage;