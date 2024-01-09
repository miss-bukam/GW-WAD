let express = require('express');
let router = express.Router();

const { ObjectId } = require('mongodb');

const mongoCRUDs = require('../db/mongoCRUDs');

const collectionName = "loc";

// Wird bei GET http://localhost:8000/users aufgerufen 
router.get('/', async function(req, res) {
    const userId = req.userId 
  
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
router.get("/:id", async (req, res) => { 
    console.log("getPost: called");
    try {
        const collection = mongoCRUDs.collection(collectionName); // Hier die Collection initialisieren
        const query = {_id: new ObjectId(req.params.id)};
        const result = await collection.findOneLocation(query);

        console.log(result);
        if(result)
            res.status(200).json(result);
        else {
            res.status(404).send(`Location not found!`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Something is not right!!");
    }
});


// Wird bei POST http://localhost:8000/post aufgerufen 
router.post("/", async (req, res) => {
    console.log("addPost: called")
    
    try {
        const collection = mongoCRUDs.collection(collectionName)
        
        const location = {
            name: req.body.name,
            description: req.body.description,
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            state: req.body.state,
            lat: req.body.lat,
            lng: req.body.lng
        }

        await collection.insertOne(location)

        res.status(201).end()
    } catch (err) {
        console.log(err)
    }
});

// Wird bei POST http://localhost:8000/ aufgerufen 
router.delete("/:id", async (req, res) => {
    console.log("deletePost: called")

    try {
        const collection = mongoCRUDs.collection(collectionName)

        const query = {_id: new ObjectId(req.params.id)}

        await collection.deleteOneLocation(query)
        res.status(204).end()
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
    console.log("updatePost: called")

    try {
        const collection = mongoCRUDs.collection(collectionName)
        
        const filter = {_id: new ObjectId(req.params.id)}

        const update = {
            $set: {
                name: req.body.name,
                description: req.body.description,
                street: req.body.street,
                zip: req.body.zip,
                city: req.body.city,
                state: req.body.state,
                lat: req.body.lat,
                lng: req.body.lng
            }
        }

        await collection.updateOne(filter, update)
        res.status(204).end()
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
