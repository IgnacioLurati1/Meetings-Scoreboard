import "./genericModal.css";
import "./modModal.css";
import {useState} from "react";


export default function ModModal({ selectedScore, isOpen, onClose, handleMod, handleDelete }) {
  if(!isOpen) return null;

  const [name, setName] = useState(selectedScore.name);
  const [surname, setSurname] = useState(selectedScore.surname);
  const [middlename, setMiddlename] = useState(selectedScore.middlename);
  const [score, setScore] = useState(selectedScore.score);

  return (
    <div className={`modal`}>
      <div className="modal-content" onKeyDown={(e) => e.key === "Enter" && handleMod({ name, surname, middlename, score }, selectedScore.surname)}>
        <div className="titleAndClose">
        <h2 className="title">Modificar usuario</h2>
        <div className="close" onClick={onClose}>&times;</div>
        </div>
        <div className="content-input">
            Nombre:
            <input className="input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="content-input" style={{ fontWeight: "bold" }}>
            Apellido/Apodo:
            <input className="input" type="text" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className="content-input">
            Segundo Nombre:
            <input className="input" type="text" name="middlename" value={middlename} onChange={(e) => setMiddlename(e.target.value)} />
        </div>
        <div className="content-input">
            Puntaje:
            <input autoFocus className="input" type="text" name="score" value={score} onChange={(e) => {
              const val = e.target.value;
              if (/^-?\d*$/.test(val)) {
                setScore(val);
              }
            }}  />
        </div>
        <div className="buttons">
          <button className={!surname.trim() ? "disabled-button" : "mod-button"} disabled={!surname.trim()} onClick={() => handleMod({ name, surname, middlename, score }, selectedScore.surname)}>Modificar</button>
          <button className={!surname.trim() ? "disabled-button" : "delete-button"} disabled={!surname.trim()} onClick={() => handleDelete()}>Eliminar</button>
        </div>
      </div>
    </div>
  );    
}
