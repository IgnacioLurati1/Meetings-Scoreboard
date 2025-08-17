import "./navbar.css";
import { Sling as Hamburger } from 'hamburger-react';
import {useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa"; 


export default function Navbar({ openModal }) {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));

    return(
        <div className={`navbar ${isOpen ? "navbar openNav" : "navbar"}`}>
            <button className="colapse-button" onClick={() => setIsOpen(!isOpen)}><Hamburger className="navbar-icon" toggled={isOpen} toggle={setIsOpen} color="#fff" /></button>

        {isOpen &&<div className="colapse">

            <button className="navbar-button" onClick={() => token ? (() => {localStorage.removeItem("token"), location.reload()})() : openModal(true)} ><FaUserCircle className="button-icon"/><div className="button-text">{token ? "Logout" : "Login"}</div></button>
            <button className="navbar-button"><FaCamera className="button-icon button-camera"/><a href="https://drive.google.com/drive/folders/17Tji2AM1bqK2lq56nT6IBnfzxvmFi7D8" className="navbar-href"><div className="button-text">Fotos</div></a></button>
            </div>
       } 
       </div>
        
    )
}