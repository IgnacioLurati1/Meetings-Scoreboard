
import "./scoreLabel.css";
import logo from "../assets/generic-brunou.png";
import logo2 from "../assets/generic-brunou-mujer.png";
import {useState} from "react";


export default function ScoreLabel({ setEditModalVisible, setSelectedScore, name, surname, middlename, score }) {
  const [rand, setRand] = useState(Math.round(Math.random()));

  return (
    <div className="score-label" onClick={() => (setSelectedScore({ name, surname, middlename, score }), setEditModalVisible(true))}>
      <span className = "logo-container"><img src={rand ? logo : logo2} alt="Logo" className="logo" /></span>
      <span className="name">{name} {middlename} {surname}</span>
      <span className="score">{score}</span>
    </div>
  )
}