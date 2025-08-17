import "./genericModal.css";
import "./addModal.css";
import {useState} from "react";


export default function AddModal({ isOpen, onClose, handleCreate }) {
  if(!isOpen) return null;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div className={`modal`}>
      <div className="modal-content">
        <div className="titleAndClose">
        <h2 className="title">Crear Usuario</h2>
        <div className="close" onClick={onClose}>&times;</div>
        </div>
        <div className="content-input">
            Nombre:
            <input className="input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="content-input">
            Apellido:
            <input className="input" type="text" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className="content-input">
            Segundo Nombre:
            <input className="input" type="text" name="middlename" value={middlename} onChange={(e) => setMiddlename(e.target.value)} />
        </div>
        <div className="content-input">
            Puntaje:
            <input className="input" type="number" name="score" value={score} onChange={(e) => setScore(e.target.value)} />
        </div>

          <button className="create-button" onClick={() => handleCreate({ name, surname, middlename, score })}>Crear</button>
      </div>
    </div>
  );    
}
