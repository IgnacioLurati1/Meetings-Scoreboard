import "./loginModal.css";
import "./genericModal.css"
import {useState} from "react";

export default function LoginModal({ isOpen, onClose }) {
  if(!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      fetch("https://meetings-scoreboard.onrender.com/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }).then(async response => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          console.log("Lo hemos logrado:", data);
          location.reload();
          onClose();
        } else {
          throw new Error("Error al iniciar sesión");
        }
      });
    } catch (error) {
      console.error("Error en el inicio de sesión: ", error);
    }
  }

  

  return (
    <div className={`modal`}>
      <div className="modal-content">
        <div className="titleAndClose">
        <h2 className="title">Login</h2>
        <div className="close" onClick={onClose}>&times;</div>
        </div>
        <div className="content-input">
            Email:
            <input className="input" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="content-input">
            Contraseña:
            <input className="input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
          <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
