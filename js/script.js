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

/** Hier werden Script für den Zweiten Beleg dargestellt */
let angemeldet = false;


const admina = {
    username: "admina", 
    password: "password",
    role: "admin"
};

const initScreensAddEventHandlers = function () {
if (angemeldet === false) {
    showLoginAndHideOthers();
} else {
    hideOthersAndShowMap();
}
// What event are we interested in?: submit
// What is the event target?: form
// What is the event handler?: checkLogin
document.getElementById("loginForm").onsubmit = checkLogin;
}

function checkLogin(e) { 
// e - the event obj
// Why e.preventDefault()? 
// What is the default behavior for a "submit": 
// send request to server and get html back
e.preventDefault();

// get the values of the input fields
const loginEntered = document.getElementById("usernameID").value;
const passwordEntered = document.getElementById("passwordID").value;

// check, if they are correct
if (admina.username === loginEntered &&
    admina.password === passwordEntered) {
        // correct:
        angemeldet = true;
        hideOthersAndShowMap()
} else {
        // incorrect:
    alert("Falscher Benutzername und Passwort! ");
    angemeldet = false;
}    
}

function showLoginAndHideOthers () {
document.getElementById("loginScreen").style.display = "block";
document.getElementById("mapScreen").style.display = "none";
document.getElementById("addScreen").style.display = "none";
document.getElementById("updateScreen").style.display = "none";

}

function hideOthersAndShowMap() {
document.getElementById("mapScreen").style.display = "block";
document.getElementById("loginScreen").style.display = "none";
document.getElementById("addScreen").style.display = "none";
document.getElementById("updateScreen").style.display = "none";
}

// What event are we interested in?: load
// What is the event target?: window
// What is the event handler?: initScreensAddEventHandlers
window.onload = initScreensAddEventHandlers; 