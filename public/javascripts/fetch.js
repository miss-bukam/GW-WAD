//const { application, json } = require("express");

// Funktion Um die Daten der Standorte der DB zu lesen 
async function standorte() { 
    try {
        const url = "http://localhost:8000/loc";
        const response = await fetch(url); 
        
        if(response.ok) { // 200er HTTP-Status
            // Wenn der Server mit JSON antwortet:
            const respObject = await response.json(); 
            // mach irgendwas mit der Antwort
          //  console.log(typeof respObject);
            //let lat = respObject[0].lat;
           // let lon = respObject[0].lon;
            return respObject;
            
        } else { // kein 200er HTTP-Status
            // Wenn der server nicht mit JSON antwortet: 
            const resp = await response.text(); 
            console.log("Server response was not 200er: ", resp);
            // nur im Browser: alert("Server response was not response.ok");
        }
    } catch (err) {
            console.log("Error connecting to server: ", err.message);
            // nur im Browser: alert("Error connecting to server");
    }
};

// Funktion Um die Daten der loginDaten der DB zu lesen 
async function login(username,password) { 
    try {
        const url = "http://localhost:8000/users";
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"username": username, "password": password}),
        }); 
        
        if(response.ok) { // 200er HTTP-Status
            // Wenn der Server mit JSON antwortet:
            const respObject = await response.json(); 
            // mach irgendwas mit der Antwort
          //  console.log(typeof respObject);
            //let lat = respObject[0].lat;
           // let lon = respObject[0].lon;
            return respObject;
            
        } else { // kein 200er HTTP-Status
            // Wenn der server nicht mit JSON antwortet: 
            const resp = await response.text(); 
            console.log("Server response was not 200er: ", resp);
            // nur im Browser: alert("Server response was not response.ok");
        }
    } catch (err) {
            console.log("Error connecting to server: ", err.message);
            // nur im Browser: alert("Error connecting to server");
    }
};

//NOT USED
async function logResponse(url) { 
    try {
        const response = await fetch(url); 
        
        if(response.ok) { // 200er HTTP-Status
            // Wenn der Server mit JSON antwortet:
            const respObject = await response.json(); 
            // mach irgendwas mit der Antwort
            console.log(typeof respObject);
            let lat = respObject[0].lat;
            let lon = respObject[0].lon;
            
        } else { // kein 200er HTTP-Status
            // Wenn der server nicht mit JSON antwortet: 
            const resp = await response.text(); 
            console.log("Server response was not 200er: ", resp);
            // nur im Browser: alert("Server response was not response.ok");
        }
    } catch (err) {
            console.log("Error connecting to server: ", err.message);
            // nur im Browser: alert("Error connecting to server");
    }
};

//logResponse("https://nominatim.openstreetmap.org/search?q=Kudamm,+Berlin&format=json");
