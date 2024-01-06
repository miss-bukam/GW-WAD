const { MongoClient } = require("mongodb");

const db_user = "wad_gw_23_wad_gw_23_user";
const db_pswd = "6pSxGcUOb";
const db_name= "wad_gw_23"
const dbHostname = "mongodb1.f4.htw-berlin.de"
const dbPort = 27017
const uri = `mongodb://wad_gw_23_wad_gw_23_user:6pSxGcUOb@mongodb1.f4.htw-berlin.de:27017/wad_gw_23`;

function MongoCRUDs (db_name, uri) {
    this.db_name = db_name;
    this.uri = uri;
} 

//Findet jeweils einen User
MongoCRUDs.prototype.findOneUser  = async function(uNameIn, passwdIn) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(db_name);
    const users = database.collection('Users');
    const query = {username: uNameIn, password: passwdIn};
    const doc = await users.findOne(query);
    if (doc) {
      delete doc.password;
    }
    return doc;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

//Gibt alle Users der DB zurück
MongoCRUDs.prototype.findAllUsers  = async function() {
    const client = new MongoClient(uri);
    try {  
      const database = client.db(db_name);
      const users = database.collection('Users');
      const query = {};
      const cursor = users.find(query);
      // Print a message if no documents were found
      if ((await users.countDocuments(query)) === 0) {
        console.log("No documents found!");
        return null;
      }

    let docs = new Array();
    for await (const doc of cursor) {
      delete doc.password;
      docs.push(doc);
    }
    return docs;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

//Gibt alle Standorte aus der DB zurück
MongoCRUDs.prototype.findAllLocs  = async function() {
  const client = new MongoClient(uri);
  try {  
    const database = client.db(db_name);
    const locs = database.collection('locations');
    const query = {};
    const cursor = locs.find(query);
    // Print a message if no documents were found
    if ((await locs.countDocuments(query)) === 0) {
      console.log("No documents found!");
      return null;
    }
    let docs = new Array();
    for await (const doc of cursor) {
      docs.push(doc);
    }
    return docs;
  } finally {
    // Ensures that the client will close when finished and on error
    await client.close();
  }
};

// Gibt einen Standort mit der angegebenen ID zurück
MongoCRUDs.prototype.findOneLocation = async function(locationId) {
  const client = new MongoClient(uri);
  try {
    console.log('Starte findOneLocation mit ID:', locationId);

    const database = client.db(db_name);
    const locs = database.collection('locations');
    const query = { id: parseInt(locationId, 10) };
    const loc = await locs.findOne(query);
    return loc;
  } finally {
    await client.close();
  }
}



const mongoCRUDs = new MongoCRUDs(db_name, uri);

module.exports = mongoCRUDs;