let express = require('express');
let router = express.Router();

const mongoCRUDs = require('../db/mongoCRUDs');

//für den BasisPfad /loc
app.use('/loc', mongoCRUDs);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

// Wird bei POST http://localhost:8000/users aufgerufen 


// Wird bei GET http://localhost:8000/users aufgerufen 
router.get('/get', async function(req, res) {
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

// Wird bei /loc/id http://localhost:8000/loc/1 aufgerufen 
router.get('/:id', async function(req, res) {
  try {
    // Konvertiere die ID in eine Zahl (int32)
    const locID = parseInt(req.params.id);
    const loc = await mongoCRUDs.findOneLocation(locID);

    if (loc) {
      res.status(200).json(loc);
    } else {
      res.status(404).send(`Location not found!`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



// Wird bei POST http://localhost:8000/users aufgerufen 
router.post('/', function(req, res) {
  
  let locationBody = req.body;  
  console.log (locationBody);
});

// Wird bei PUT  http://localhost:8000/users aufgerufen 


// Wird bei DELETE http://localhost:8000/users aufgerufen 



module.exports = router;
