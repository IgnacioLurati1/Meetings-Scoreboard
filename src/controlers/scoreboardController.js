import {db} from "../config/firebase.js";


function getAll(req, res) {
  db.collection("scoreboard")
    .get()
    .then((snapshot) => {
      const players = [];
      snapshot.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(players);
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

function getOne(req, res) {
    db.collection("scoreboard")
    .where("surname", "==", req.params.surname)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return res.status(404).json({ error: "Player not found" });
      }

      const player = snapshot.docs[0].data();
      res.status(200).json({ id: snapshot.docs[0].id, ...player });
    })
    .catch((error) => {
      console.error("Error fetching player:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

function create(req, res){
    db.collection("scoreboard")
    .add(req.body)
    .then((docRef) => {
      res.status(201).json({ id: docRef.id, ...req.body });
    })
    .catch((error) => {
      console.error("Error adding player:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

function update(req, res){
    db.collection("scoreboard")
    .where("surname", "==", req.params.surname)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return res.status(404).json({ error: "Player not found" });
      }
        const playerRef = snapshot.docs[0].ref;
        playerRef.update(req.body)
          .then(() => {
            res.status(200).json({ id: playerRef.id, ...req.body });
          })
          .catch((error) => {
            console.error("Error updating player:", error);
            res.status(500).json({ error: "Internal server error" });
          });
    });
}

function remove(req, res) {
    db.collection("scoreboard")
    .where("surname", "==", req.params.surname)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return res.status(404).json({ error: "Player not found" });
      }

      const playerRef = snapshot.docs[0].ref;
      playerRef.delete()
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          console.error("Error deleting player:", error);
          res.status(500).json({ error: "Internal server error" });
        });
    });
}

export {
    getAll,
    getOne,
    create,
    update,
    remove
};

