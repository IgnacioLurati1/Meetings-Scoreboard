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

async function create(req, res){
    try {
      const surname = req.body.surname;

      const snapshot = await db.collection("scoreboard").where("surname", "==", surname).get();

      if(!snapshot.empty) {
        return res.status(400).json({ error: "Ya lo cargaste pibe" });
      }

      const docRef = await db.collection("scoreboard").add(req.body);
      res.status(201).json({ id: docRef.id, ...req.body });
      
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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

