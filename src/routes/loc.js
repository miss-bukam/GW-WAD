let express = require('express');
let router = express.Router();

const mongoCRUDs = require('../db/mongoCRUDs');

// Wird bei POST http://localhost:8000/users aufgerufen 


// Wird bei GET http://localhost:8000/users aufgerufen 
router.get('/', async function(req, res) {
  const userId = req.userId // User ID aus req

  try {
    //let userDoc = await mongo_cruds.findOneUser("admina", "pass1234");
    let locs = await mongoCRUDs.findAllLocs();
    if(locs)
      res.status(200).json(locs);
    else {
      res.status(404).send(`Locations not found!`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something is not right!!");
  }
});

// Wird bei GET <id> http://localhost:8000/users aufgerufen 


// Wird bei POST http://localhost:8000/users aufgerufen 
router.post('/', function(req, res) {
  // wird automatisch in ein JS-Objekt umgewandelt, 
  // wenn Content-Type: application/json gesetzt ist
  let locationBody = req.body;  
  console.log (locationBody);
});

// Wird bei PUT  http://localhost:8000/users aufgerufen 
router.putt('/', function(req, res) {
  const userId = req.userId
  // Hier sollte die Implementierung für die Aktualisierung des Standorts eines bestimmten Benutzers erfolgen
  // Der aktualisierte Standort sollte im Körper der PUT-Anfrage enthalten sein
  res.status(200).send(`Updated location for user with ID ${userId}`)
});


// Wird bei DELETE http://localhost:8000/users aufgerufen 
router.delete('/', function(req, res) {
  const userId = reg.userId // Benutzer-ID aus der Anfrage
  // Hier sollte die Implementierung für das Löschen des Standorts eines bestimmten Benutzers erfolgen
  res.status(200).send(`Deleted location for user with ID ${userId}`);
});


module.exports = router;
