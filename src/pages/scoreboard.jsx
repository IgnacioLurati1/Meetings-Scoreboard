
import ScoreLabel from "../components/scoreLabel.jsx" 
import "./scoreboard.css";
import {useEffect, useState} from "react";
import { ClipLoader } from 'react-spinners';
import { AiOutlinePlus } from "react-icons/ai";
import  AddModal from "../components/addModal.jsx";


export default function Scoreboard() {

const rand = Math.floor(Math.random() * 5);

var texts = ["Fucci fucci chuchis pupu puchi", "Tudino pasame el maniquin challenge", "El server es gratis pibe\nno te quejes", "ratatauvedoblepedopedopito", "chicles man es increible"]

const [people, setPeople] = useState([]);
const [loading, setLoading] = useState(true);
const [token, setToken] = useState(localStorage.getItem("token"));
const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
  fetch("https://meetings-scoreboard.onrender.com/api/scoreboard")
  .then(response => {
    if(response.ok) return response.json()
  })
  .then(data => {
    console.log(data);
    var peopleAdd = [
  { id: 4, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 5, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 6, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 7, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 8, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 9, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 10, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 },
  { id: 11, name: "Juan", surname: "Pérez", middlename: "Carlos", score: 90 }
];
    data = [...data, ...peopleAdd];
    setLoading(false);
    setPeople(data.sort((a, b) => b.score - a.score));
  })
  .catch(error => {
    setLoading(false);
    console.log(error);
    console.log("Failed to fetch data from the API");
  })
}, []);

function createUser(data) {
  fetch("https://tu-backend.onrender.com/api/scoreboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  body: JSON.stringify({
    name: data.name,
    surname: data.surname,
    middlename: data.middlename,
    score: data.score
  })
})
  .then(res => res.json())
  .then(response => {
    console.log("Respuesta del servidor:", response);
  })
  .catch(err => {
    console.error("Error al hacer POST:", err);
  });
}


  return ( 
  <section className="scoreboard">
    {token && <AddModal isOpen={modalVisible} onClose={() => setModalVisible(false)} handleCreate={createUser} />}
    <h1 className="scoreboard-title">TABLA DE POSICIONES</h1>
    {loading && <div className="loading">
      <ClipLoader color="#ffffffff" size={300} />
      <h1>{texts[rand]}</h1>
      </div>}
    <div className="scoreboard-grid">
      <ul className="scoreboard-list">
        {people.map((person, index) => (
          <li key={person.id} style={{ animationDelay: `${index * 0.15}s` }}>
            <ScoreLabel name={person.name} surname={person.surname} middlename={person.middlename} score={person.score} />
          </li>
        ))}
      </ul>
    </div>
    {token && !loading && <div className="scoreboard-footer">
      <button className="footer-button" onClick={() => setModalVisible(true)}> Añadir Participante <AiOutlinePlus /></button>
    </div>}
  </section>
  )
}