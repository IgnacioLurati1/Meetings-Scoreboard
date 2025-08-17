
import "./scoreLabel.css";

export default function ScoreLabel({ name, surname, middlename, score }) {
  return (
    <div className="score-label">
      <span className="name">{name} {middlename} {surname}</span>
      <span className="score">{score}</span>
    </div>
  )
}