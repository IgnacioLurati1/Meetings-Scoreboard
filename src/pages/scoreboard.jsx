
import ScoreLabel from "../components/scoreLabel.jsx" 
import "./scoreboard.css";
import {useEffect, useState} from "react";

export default function Scoreboard() {

var [people, setPeople] = useState([]);

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
    setPeople(data.sort((a, b) => b.score - a.score));
  })
  .catch(error => {
    console.log(error);
    console.log("Failed to fetch data from the API");
  })
}, []);


  return ( 
  <section className="scoreboard">
    <h1 className="scoreboard-title">TABLA DE POSICIONES</h1>
    <div className="scoreboard-grid">
      <ul className="scoreboard-list">
        {people.map((person) => (
          <li key={person.id}>
            <ScoreLabel name={person.name} surname={person.surname} middlename={person.middlename} score={person.score} />
          </li>
        ))}
      </ul>
    </div>
  </section>
    )
}