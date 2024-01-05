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

logResponse("https://nominatim.openstreetmap.org/search?q=Kudamm,+Berlin&format=json");

// q=Straße + Hausnr + PLZ + Stadt&format=json

// Server sendet 404 (not found):
//logResponse("https://api.github.com/users/aksdjkfdsuifsdiufdsiu");

//logResponse("https://trivia.cyberwisp.com/getrandomchristmasquestion");