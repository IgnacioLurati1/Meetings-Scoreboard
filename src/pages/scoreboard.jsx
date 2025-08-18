
import ScoreLabel from "../components/scoreLabel.jsx" 
import "./scoreboard.css";
import {useEffect, useState} from "react";
import { ClipLoader } from 'react-spinners';
import { AiOutlinePlus } from "react-icons/ai";
import  AddModal from "../components/addModal.jsx";
import ModModal from "../components/modModal.jsx";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";


export default function Scoreboard() {

const rand = Math.floor(Math.random() * 5);

var texts = ["Fucci fucci chuchis pupu puchi", "Tudino pasame el maniquin challenge", "El server es gratis pibe\nno te quejes", "ratatauvedoblepedopedopito", "chicles man es increible"]

const [people, setPeople] = useState([]);
const [loading, setLoading] = useState(true);
const [token, setToken] = useState(localStorage.getItem("token"));
const [modalVisible, setModalVisible] = useState(false);
const [modalEditVisible, setEditModalVisible] = useState(false);
const [selectedScore, setSelectedScore] = useState(null);

useEffect(() => {
  if (!isTokenValid() && token) {
    localStorage.removeItem("token");
    setToken(null);
    location.reload();
  }

  fetch("https://meetings-scoreboard.onrender.com/api/scoreboard")
  .then(response => {
    if(response.ok) return response.json()
  })
  .then(data => {
    console.log(data);
    setLoading(false);
    setPeople(data.sort((a, b) => b.score - a.score));
  })
  .catch(error => {
    console.log(error);
    setLoading(false);
    toast.error("Hmm capaz el server está caido, dale tiempo")
  })

}, []);

function modUser(data, originalSurname) {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    toast.error("Token inválido, por favor inicia sesión de nuevo");
    return;
  }

  toast.info("En eso andamos")
  fetch(`https://meetings-scoreboard.onrender.com/api/scoreboard/${encodeURIComponent(originalSurname)}`, {
    method: "PUT",
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
  .then(res => {if(!res.ok){ throw new Error("Error al crear el usuario")} return res.json()})
  .then(response => {
    setPeople(prevPeople => prevPeople.map(person => person.id === response.id ? response : person));
    setEditModalVisible(false);
  })
  .catch(err => {
    console.log(err);
    toast.error("No se pudo modificar, capaz el server está caído o hiciste chanchada")
  });
}

function deleteUser(surname) {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    setToken(null);
    toast.error("Token inválido, por favor inicia sesión de nuevo");
    return;
  }

  toast.info("Eliminando a tudino, na mentira")
  fetch(`https://meetings-scoreboard.onrender.com/api/scoreboard/${surname}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(()=>{setPeople(prevPeople => prevPeople.filter(person => person.surname !== surname)); setEditModalVisible(false);})
  .catch(err => {
    console.log(err);
    toast.error("No se pudo eliminar, capaz el server está caido")
  });
}

function createUser(data) {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    setToken(null);
    toast.error("Token inválido, por favor inicia sesión de nuevo");
    return;
  }

  toast.info("Creando usuario my friend")
  fetch("https://meetings-scoreboard.onrender.com/api/scoreboard", {
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
  .then(res => {if(!res.ok){ throw new Error("Error al crear el usuario")} return res.json()})
  .then(response => {
    setPeople(prevPeople => [response, ...prevPeople]);
    setModalVisible(false);
  })
  .catch(err => {
    console.log(err);
    toast.error("No se pudo añadir, capaz el server está caído o hiciste chanchada")
  });
}

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (err) {
    console.error("Error leyendo token:", err);
    return false;
  }

}


  return ( 
  <section className="scoreboard">
    {token && <AddModal isOpen={modalVisible} onClose={() => setModalVisible(false)} handleCreate={createUser} />}
    {token && selectedScore && <ModModal selectedScore={selectedScore} isOpen={modalEditVisible} onClose={() => setEditModalVisible(false)} handleDelete={() => deleteUser(selectedScore.surname)} handleMod={modUser} />}
    <h1 className="scoreboard-title">TABLA DE POSICIONES</h1>
    {loading && <div className="loading">
      <ClipLoader color="#ffffffff" size={300} />
      <h1>{texts[rand]}</h1>
      </div>}
    <div className="scoreboard-grid">
      <ul className="scoreboard-list">
        {people.map((person, index) => (
          <li key={person.id} style={{ animationDelay: `${index * 0.15}s` }}>
            <ScoreLabel setSelectedScore={setSelectedScore} setEditModalVisible={setEditModalVisible} name={person.name} surname={person.surname} middlename={person.middlename} score={person.score} />
          </li>
        ))}
      </ul>
    </div>
    {token && !loading && <div className="scoreboard-footer">
      <button className="footer-button" onClick={() => setModalVisible(true)}> Añadir Participante <AiOutlinePlus /></button>
    </div>}
    <ToastContainer position="top-right" autoClose={3000} />
    {people.length === 0 && !loading && <h2 className="loading">No hay datos para mostrar</h2>}
  </section>
  )
}