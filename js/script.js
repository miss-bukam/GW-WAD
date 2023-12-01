//ICON einfuegen 
var leafIcon = L.icon({
    iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
    shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
});


//KARTE einfuegen 
var meineKarte = L.map('karte').setView([51.1657, 10.4515], 11);
L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(meineKarte);

//Setzt ein Punkt auf die Karte (mit dem Icon)
var marker = L.marker([52.5295625,13.2383125], { icon: leafIcon }).addTo(meineKarte);  //Setzt Punkt in die Liste 
marker.bindPopup("Müll Heizkraftwerk").openPopup(); //Öffntet ein Pop-up sobald mal auf den Punkt drückt

 //Setzt ein Punkt auf die Karte (mit dem Icon)
 var marker2 = L.marker([52.5374407951431,13.3472728336849], { icon: leafIcon }).addTo(meineKarte);  //Setzt Punkt in die Liste 
marker2.bindPopup("Heizkraftwerk Moabit").openPopup(); //Öffntet ein Pop-up sobald mal auf den Punkt drückt

 //Setzt ein Punkt auf die Karte (mit dem Icon)
var marker3 = L.marker([52.487667277309974, 13.3116531306552], { icon: leafIcon }).addTo(meineKarte);  //Setzt Punkt in die Liste 
marker3.bindPopup("Vattenfall Wärme Berlin AG, Heizkraftwerk Wilmersdorf").openPopup(); //Öffntet ein Pop-up sobald mal auf den Punkt drückt


//Methoden Funktion für das ein und Ausblenden der Standort Liste
function toggleListMenue() {
    const ListmenueVar = document.getElementById("listeMenueID") /* gibt das Elemnt als Objekt wieder, dieses objekt wird in der Variable ListMenueVar gespeichert */
   /*  console.log("Hello")  /*console = Ausgabe auf der Konsole im Tool */
   /* console.log(ListmenueVar)   */ /*Hier wird das gespeicherte Objekt auf der Konsole ausgeben */ 
   
    /* Kurz was passiert hier=?
        Hier wird geschaut ob das Objekt ListmenueVar die Klasse "versteckt" enthält
        nun schau ich, anfangs enthält das Objekt ListmenueVar die KLasse "versteckt" nicht,
        sodass ich in die Else- Bedingung springe und "versteckt" hinzufüge. ( Im CSS ist die Klasse versteckt als display:none dargestellt )
        Nun enthält das Objekt die KLasse versteckt. Klicke ich nochmal auf die Dreierstriche 
        wiederhole ich den Vorgang mit der If bedingung. Das heißt die KLasse "versteckt" ist im Objekt ListmenueVAr enthalten.
        somit entferne ich die Klasse versteckt und die Liste wird angezeigt.

    */
    if(ListmenueVar.classList.contains("versteckt")) {
        ListmenueVar.classList.remove("versteckt")
    }
    else{
        ListmenueVar.classList.add("versteckt")     /* fügt div eine Klasse hinzu*/
    }
}

/**********************
 * ************** 
 * Hier werden Script für den Zweiten Beleg dargestellt 
 * **************
 * ********************/


let angemeldet = false;


// Der Admin 
const admina = {
    username: "admina", 
    password: "password",
    role: "admin"
};

//Der Normalo
const normalo = {
    username: "normalo", 
    password: "password",
    role: "non-admin"
};


/*Auführungsfunktion der Aktionen */
const initScreensAddEventHandlers = function () {
if (angemeldet === false) {
    showLoginAndHideOthers();
} else {
    hideOthersAndShowMap();
}

document.getElementById("loginForm").onsubmit = checkLogin;


//OnClickButton für den Add Screen 
document.querySelector('#addID').onclick = function(){
    if(angemeldet){
        hideOthersAndShowAdd();
    } else{
        alert("Sie sind kein Admin! ")
    }
};

//OnClickButton für den Abmelde Button
document.querySelector('#logoutID').onclick = function(){
    if(angemeldet){
        showLoginAndHideOthers();
        currentUser = null;
    } else{
        alert("Passiert nichts..")
    }
};

}

//   Prüft den Login 
function checkLogin(e) { 
// e - the event obj
// Why e.preventDefault()? 
// What is the default behavior for a "submit": 
// send request to server and get html back
e.preventDefault();

// get the values of the input fields
const loginEntered = document.getElementById("usernameID").value;
const passwordEntered = document.getElementById("passwordID").value;

let  currentUser = null; // aktueller User

// check, if they are correct
if (admina.username === loginEntered && admina.password === passwordEntered 
    || normalo.username === loginEntered && normalo.password === passwordEntered ) {
        // correct:
        angemeldet = true;
        hideOthersAndShowMap();
       
        if(loginEntered === admina.username){
            currentUser= admina;
        }else{
            currentUser= normalo;
        }
        
        // 
        const addButton = document.querySelector('#addID');
        if (angemeldet && currentUser.role === "admin") {
            // Benutzer ist angemeldet und hat die Rolle "admin", zeige den Button an
            addButton.style.display = 'block';            // console.log("Benutzer ist ein Admin. Zeige den Button an.");

        } else {
            // Benutzer hat keine Berechtigung, verstecke den Button
            addButton.style.display = 'none';           // console.log("Benutzer ist kein Admin. Verstecke den Button.");
        }

} else {
        // incorrect:
    alert("Falscher Benutzername und Passwort! ");
    angemeldet = false;
   
}  
}

window.onload = initScreensAddEventHandlers; 

//Zeigt den LoginScreen - Entfernt alle anderen Screen's
function showLoginAndHideOthers () {
document.getElementById("loginScreen").style.display = "block";
document.getElementById("mapScreen").style.display = "none";
document.getElementById("addScreen").style.display = "none";
document.getElementById("updateScreen").style.display = "none";

}

//Zeigt den Mapcreen - Entfernt alle anderen Screen's
function hideOthersAndShowMap() {
document.getElementById("mapScreen").style.display = "block";
document.getElementById("loginScreen").style.display = "none";
document.getElementById("addScreen").style.display = "none";
document.getElementById("updateScreen").style.display = "none";
}

//Zeigt den Mapcreen - Entfernt alle anderen Screen's
function hideOthersAndShowUpdate() {
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("addScreen").style.display = "none";
    document.getElementById("updateScreen").style.display = "block";
    }

//Zeigt den Addcreen - Entfernt alle anderen Screen's
const hideOthersAndShowAdd = function(){
    if(angemeldet){
        document.getElementById("addScreen").style.display = "block";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("updateScreen").style.display = "none";
        document.getElementById("mapScreen").style.display = "none";

    }/* else if (angemeldet && normalo.role === "non-admin") {
        alert("Sie sind kein Admin!");
        document.getElementById("addID").style.display = "none"; // verstecke Button

    } else {
        alert("Unbekannter Benutzer!");
    }*/
};

// Wenn man auf Liste klickt, kommt UpdateScreen
document.querySelector('#ortID').onclick = function(){
    const loginEntered = document.getElementById("usernameID").value;
    let  currentUser = (loginEntered === admina.username) ? admina:normalo;

    if(angemeldet && currentUser.role === "admin"){
        hideOthersAndShowUpdate();
    } else{
        alert("Sie sind nicht Admin");
    }
};

// Wenn man Abbrechen im UpdateScreen klickt, kommt MapScreen
document.querySelector('#updateCancelID').onclick = function(){
    if(angemeldet){
        hideOthersAndShowMap();
    } else{
        alert("Unbekannter Fehler");
    }
};

// Wenn man Abbrechen im AddScreen klickt, kommt MapScreen
document.querySelector('#addCancelID').onclick = function(){
    if(angemeldet){
        hideOthersAndShowMap();
    } else{
        alert("Unbekannter Fehler");
    }
};

// Wenn man add klickt im AddScreen kommt MainScreen
document.querySelector('#plusID').onclick = function(){
    if(angemeldet){
        hideOthersAndShowMap();
        // Daten speichern
        //TODO Pop up
    } else{
        alert("Unbekannter Fehler");
    }
};

const addScreen = document.getElementById("addScreen");


  // Funktion zum Behandeln des Absendens des Formulars zum Hinzufügen eines Standorts
  document.getElementById("plusID").addEventListener("click", function (event) {
    event.preventDefault();
  
    // Werte aus dem Formular erhalten
    if(addScreen.style.display === "none") {
        const name = document.getElementById("nameID").value;
        const street = document.getElementById("streetID").value;
        const city = document.getElementById("cityID").value;

        if(name && street && city) {
            const description = document.getElementById("describtionID").value;
            const zip = document.getElementById("zipID").value;
            const lat = document.getElementById("latID").value;
            const lon = document.getElementById("lonID").value;

            if(lat && lon) {
                displayMarkerOnMap(parseFloat(lat),parseFloat(lon),name)
            }

            // Den neuen Standort zur Liste hinzufügen
            const list = document.getElementById("ortID");
            const newName = document.createElement("li");

            newName.textContent = `${name}`;
            newName.style.marginBottom = "120px";

            const newDetails = document.createElement("li");
            newDetails.innerHTML = `<div class="AllgemeineStandortBeschreibung">
            <p class="Adresse">Adresse: ${street}, ${zip} ${city}</p>
            <p class="Beschreibung">Beschreibung: ${description}</p>
            <p class="Latitude">Latitude: ${lat}</p>
            <p class="Longitude">Longitude: ${lon}</p>
            </div>`;

            newDetails.style.marginBottom = "0px";
            newDetails.style.padding = "0px";

            list.appendChild(newName);
            newName.appendChild(newDetails);

            // Den neuen Standort zur Karte hinzufügen (diesen Teil musst du implementieren)
            // Beispiel: displayMarkerOnMap(lat, lon);
    
            // Die Formularfelder leeren
            document.getElementById("nameID").value = "";
            document.getElementById("describtionID").value = "";
            document.getElementById("streetID").value = "";
            document.getElementById("zipID").value = "";
            document.getElementById("cityID").value = "";
            document.getElementById("latID").value = "";
            document.getElementById("lonID").value = "";

        } else {
            alert("Name, Straße und Stadt sind erforderlich!");
            hideOthersAndShowAdd();
        }
    }
});
  

    // Beispiel-Funktion zum Anzeigen eines Markers auf der Karte (ersetze dies durch deine Kartenimplementierung)
    function displayMarkerOnMap(lat, lon) {
    const mapElement = document.getElementById("karte");
  
    // Ersetze die folgende Zeile durch deinen tatsächlichen Code zum Hinzufügen eines Markers zur Karte
    mapElement.innerHTML = `Marker hinzugefügt bei LAT: ${lat}, LON: ${lon}`;
  }
  
  function displayMarkerOnMap(lat, lon, name) {
    const mapElement = document.getElementById("karte");

    // Erstelle einen neuen Marker mit dem Icon
    const newMarker = L.marker([lat, lon], { icon: leafIcon }).addTo(meineKarte);
    newMarker.bindPopup(name).openPopup(); // Zeige den Standortnamen im Popup an

    // Ersetze die folgende Zeile durch deinen tatsächlichen Code zum Hinzufügen eines Markers zur Karte
    // mapElement.innerHTML = `Marker hinzugefügt bei LAT: ${lat}, LON: ${lon}`;
    }






/* Bist du admin? Oder non-Admin?
function checkUserRole() {
    const addButton = document.querySelector('#addID');
    console.log("Angemeldet:", angemeldet);
    console.log("Rolle (admina):", admina.role);
    console.log("Rolle (normalo):", normalo.role);

    if (angemeldet && currentUser.role === "admin") {
        // Benutzer ist angemeldet und hat die Rolle "admin", zeige den Button an
        console.log("Benutzer ist ein Admin. Zeige den Button an.");

        addButton.style.display = 'block';
    } else {
        // Benutzer hat keine Berechtigung, verstecke den Button
        console.log("Benutzer ist kein Admin. Verstecke den Button.");

        addButton.style.display = 'none';
    }
}
*/





/*
//Globalen JS-Objekte Müllheizkraftwerk
let lockMuellHeizkraftwerk = {
    name: "Müll Heizkraftwerk",
    desc: "Heizkraftwerk ", 
    street: "Freiheit 24-25",
    zip: "13597", 
    city: "Berlin",
    state: "Deutschland",
    lat: 52.5295625,
    lon: 13.2383125
};

//Globalen JS-Objekte Vatenfall Wärme
let lockVattenfallWaerme = {
    name: "Vatenfall Wärme Berlin AG",
    desc: "Heizkraftwerk", 
    street: "Kurfürstendamm 143",
    zip: "10709", 
    city: "Berlin",
    state: "Deutschland",
    lat: 52.487667277309974,
    lon: 13.3116531306552
};

//Globalen JS-Objekte Heizkraftwerk Moabit
let lockMuellHeizkraftwerkMoabit = {
    name: "Müll Hiezkraftwerk Moabit ",
    desc: "Müll Heizkraftwerk", 
    street: "Friedrich-Krause-Ufer",
    zip: "13353", 
    city: "Berlin",
    state: "Deutschland",
    lat: 52.5374407951431,
    lon: 13.3472728336849
};*/
