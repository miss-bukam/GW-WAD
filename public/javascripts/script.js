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

locations = [];
let id = null;
let currentUser = null; // aktueller User
let angemeldet = false;

/*Auführungsfunktion der Aktionen */
const initScreensAddEventHandlers = function () {
if (angemeldet === false) {
  showLoginAndHideOthers();
} else {
  hideOthersAndShowMap();
}

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

//OnClickButton für löschen Button
document.querySelector('#deleteID').onclick = function() {
  if (angemeldet && currentUser.role === "admin") {
      const locationIdToDelete = 1; //TODO noch ändern
      const confirmed = confirm("Möchten Sie diesen Standort wirklich löschen?");
      if (confirmed) {

          const locationIndex = locations.findIndex(location => location.id === locationIdToDelete);

          if (locationIndex !== -1) {
              // Standort aus der Liste entfernen
              
              locations.splice(locationIndex, 1);

              alert("Standort erfolgreich gelöscht!");
              hideOthersAndShowMap(); // Zurück zur Karte 

              /*delete locations[locationIdToDelete].name               
              locations[locationIdToDelete].describtion = null;
              locations[locationIdToDelete].street = null;
              locations[locationIdToDelete].zip = null;
              locations[locationIdToDelete].city = null;
              locations[locationIdToDelete].lat = null;
              locations[locationIdToDelete].lon = null;
              locations[locationIdToDelete].bundesland = null;*/

              updateLocationList(); // Aktualisiere die Standortliste

          } else {
              alert("Fehler beim Löschen des Standorts! Standort nicht gefunden.");
          }
      }
  } else {
      alert("Fehler beim Löschen des Standorts!");
  }
}
}

document.getElementById("loginForm").onsubmit = checkLogin;

// Prüft den Login 
async function checkLogin(e) { 
// e - the event obj
// Why e.preventDefault()? 
// What is the default behavior for a "submit": 
// send request to server and get html back
e.preventDefault();

// get the values of the input fields
const loginEntered = document.getElementById("usernameID").value;
const passwordEntered = document.getElementById("passwordID").value;

//Nimmt die Daten aus der Datenbank 
let currentUser = await login(loginEntered,passwordEntered);
console.log(currentUser);
// check, if they are correct
if (currentUser) {
      // correct:
      angemeldet = true;

      //----- Standorte aus der DB 
      let locs = await standorte();
      console.log(locs);

      hideOthersAndShowMap();
     /* if(loginEntered === admina.username){
          currentUser= admina;
      }else{
          currentUser= normalo;
      }*/
      
      // Der Hinzufüge Button
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
  alert("Falscher Benutzername oder Passwort! ");
  angemeldet = false;
 
}  
}

//Nach dem Login wird der Name angezeigt
function showName() {
  const username = document.getElementsById("usernameID").value;
    const welcomeContainer = document.querySelector(".welcome_Container");
    
    if (username.trim() !== "" && welcomeContainer) {
        const loginContainer = document.querySelector(".login-container");
        const welcomeMessage = document.getElementById("welcome_message");

        welcomeMessage.textContent = `Hallo, ${username}!`;
        welcomeContainer.style.display = "block";
        loginContainer.style.display = "none";
    } else {
        alert("Bitte gebe deinen Namen ein");
    }
}

window.onload = initScreensAddEventHandlers; 

// Zeigt den LoginScreen - Entfernt alle anderen Screen's
function showLoginAndHideOthers () {
document.getElementById("loginScreen").style.display = "block";
document.getElementById("mapScreen").style.display = "none";
document.getElementById("addScreen").style.display = "none";
document.getElementById("updateScreen").style.display = "none";

}

// Zeigt den Mapcreen - Entfernt alle anderen Screen's
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
document.getElementById('ortID').addEventListener ('click', function(event){
  if (event.target.tagName === 'LI') {
      console.log("Clicked LI element: ", event.target);

  
  //Standort speichern und durch aufruf der FUnktion
  //populateUpdateForm() Daten speichern und eig. auf das update Screen bringen
  const selectedName = event.target.firstChild.textContent.trim() || event.target.innerText.trim();
  console.log("Slected Name : ", selectedName);      //Zeige mir den Standort an 
  console.log("Standorte array: ", standorte);
  populateUpdateForm(selectedName);
  }

  if(angemeldet && currentUser.role === "non-admin") {
      hideOthersAndShowUpdate();
      document.getElementById("deleteID").style.display = "none";
      document.getElementById("updateID").style.display = "none";
       
  } else if (angemeldet && currentUser.role === "admin") {
      hideOthersAndShowUpdate();
      document.getElementById("deleteID").style.display = "inline-block";
      document.getElementById("updateID").style.display = "inline-block";
  } else{
      alert("Fehler");
  }

});

//Die Funktion setzt die Werte auf den Update/Delete Screen 
function populateUpdateForm(selectedLocationName) {
  //console.log("Selected Location Name:", selectedLocationName);
  //console.log("Standorte:", standorte);
  // Finde den ausgewählten Standort im Array
  const selectedLocationObj = standorte.find(loc => loc.name.trim() === (typeof selectedLocationName === 'string' ? selectedLocationName.trim() : selectedLocationName));

  if (selectedLocationObj) {
      // Fülle die Formularfelder mit den Informationen des ausgewählten Standorts
      setValueIfExists("updateNameID", selectedLocationObj.name);
      setValueIfExists("updateDescribtionID", selectedLocationObj.desc);
      setValueIfExists("updateStreetID", selectedLocationObj.street);
      setValueIfExists("updateZipID", selectedLocationObj.zip);
      setValueIfExists("updateCityID", selectedLocationObj.city);
      setValueIfExists("updateBundeslandID", selectedLocationObj.state);
      setValueIfExists("updateLatID", selectedLocationObj.lat);
      setValueIfExists("updateLonID", selectedLocationObj.lon);
  } else {
      console.error("Standort nicht gefunden!");
  }
}

//ÜberPrüfung des Standortes mit den Werten, wenn es nicht vorhanden ist, setzte nichts
function setValueIfExists(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
      element.value = value || ''; // Setze den Wert, falls vorhanden, ansonsten leeren String
  } else {
      console.error("Element mit ID ${elementId} nicht gefunden!");
  }
}


//Funktion fügt Standorte zur StandortListe hinzu
function addLocationToArr(name, description, street, zip, city, lat, lon, bundesland) {
  const newLocation = {
      name: name,
      desc: description,
      street: street,
      zip: zip,
      city: city,
      lat: lat,
      lon: lon,
      state: bundesland,
      id: findMaxId() + 1 
  };

  standorte.push(newLocation);
  updateLocationList();
  return newLocation;
}

// Wenn man Abbrechen im UpdateScreen klickt, kommt MapScreen
document.querySelector('#updateCancelID').onclick = function(e){
  e.preventDefault();             // Bei jedem Hinzufügen
  if(angemeldet){
      hideOthersAndShowMap();
  } else{
      alert("Unbekannter Fehler");
  }
};

// Abbrechen Button in der Update/Screen Seite
document.querySelector('#addCancelID').onclick = function(e){
  e.preventDefault();  // Bei jedem Hinzufügen
  if(angemeldet){
      hideOthersAndShowMap();
  } else{
      alert("Unbekannter Fehler");
  }
};

// OnClick für Standort in der MapScreen anzuzeigen
document.querySelector('#plusID').onclick = function(){
  if(angemeldet){
      hideOthersAndShowMap();

  } else{
      alert("Unbekannter Fehler");
  }
};

// Funktion zum Behandeln des Absendens des Formulars zum Hinzufügen eines Standorts
document.getElementById("plusID").addEventListener("click", function (event) {
  event.preventDefault();

  // Werte aus dem Formular erhalten
  if(addScreen.style.display === "none") {
      const name = document.getElementById("nameID").value;
      const street = document.getElementById("streetID").value;
      const city = document.getElementById("cityID").value;

      if(name && street && city) {
          const describtion = document.getElementById("describtionID").value;
          const zip = document.getElementById("zipID").value;
          const lat = document.getElementById("latID").value;
          const lon = document.getElementById("lonID").value;
          const bundesland = document.getElementById("bundeslandID").value;

          if(lat && lon) {
              displayMarkerOnMap(parseFloat(lat),parseFloat(lon),name)
          }

          // Den neuen Standort zur Liste hinzufügen
          const list = document.getElementById("ortID");
          const newName = document.createElement("li");
          newName.id = `listItem_${location.id};`
          newName.textContent = `${name}`;
          newName.style.marginBottom = "167px";

          const newDetails = document.createElement("li");
          newDetails.innerHTML = `<div class="AllgemeineStandortBeschreibung">
          <p class="Adresse">Adresse: ${street}, ${zip} ${city}</p>
          <p class="Bundesland">Bundesland: ${bundesland}</p>
          <p class="Beschreibung">Beschreibung: ${describtion}</p>
          <p class="Latitude">Latitude: ${lat}</p>
          <p class="Longitude">Longitude: ${lon}</p>
          </div>`;

          newDetails.style.marginBottom = "0px";
          newDetails.style.padding = "0px";

          list.appendChild(newName);
          newName.appendChild(newDetails);

          id++;

          addLocationToArr(name, describtion, street, zip, city, lat, lon, bundesland);
          populateUpdateForm(newName);
  
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

const addScreen = document.getElementById("addScreen");

//Funktion zum Anzeigen eines Markers auf der Karte 
function displayMarkerOnMap(lat, lon) {
  const mapElement = document.getElementById("karte");
  mapElement.innerHTML = `Marker hinzugefügt bei LAT: ${lat}, LON: ${lon}`;
}

//Funktion zum Anzeigen eines Markers auf der Karte 
function displayMarkerOnMap(lat, lon, name) {
const mapElement = document.getElementById("karte");

 // Erstelle einen neuen Marker mit dem Icon
const newMarker = L.marker([lat, lon], { icon: leafIcon }).addTo(meineKarte);
newMarker.bindPopup(name).openPopup(); // Zeige den Standortnamen im Popup an

  // Ersetze die folgende Zeile durch deinen tatsächlichen Code zum Hinzufügen eines Markers zur Karte
  // mapElement.innerHTML = `Marker hinzugefügt bei LAT: ${lat}, LON: ${lon}`;
}

//******************UPDATE_DELETE_SZENARIO*******************

// OnClick für den #updateID-Button
document.querySelector('#updateID').onclick = function (e) {
  e.preventDefault();

  // Hier Annahme: Du erhältst den ausgewählten Index des Standorts aus dem Update-Bildschirm
  const selectedLocationIndex = getSelectedLocationIndex(); // Funktion, um den ausgewählten Index zu erhalten
  console.log("Selected Locationnnnnn:", selectedLocation);

  // Überprüfen, ob der ausgewählte Index im gültigen Bereich liegt
  if (selectedLocationIndex >= 0 && selectedLocationIndex < standorte.length) {
      const selectedLocation = {
          name: document.getElementById('updateNameID').value,
          desc: document.getElementById('updateDescribtionID').value,
          street: document.getElementById('updateStreetID').value,
          zip: document.getElementById('updateZipID').value,
          city: document.getElementById('updateCityID').value,
          state: document.getElementById('updateBundeslandID').value,
          lat: document.getElementById('updateLatID').value,
          lon: document.getElementById('updateLonID').value,
      };

      console.log("Standorte:", locations);

      // Aktualisiere die Daten des ausgewählten Standorts im Array
      standorte[selectedLocationIndex] = selectedLocation;
      updateLocationList(); // Aktualisiere die Standortliste
      alert("Standort erfolgreich aktualisiert!");
  } else {
      alert("Fehler beim Aktualisieren des Standorts! Ungültiger Index.");
  }
};


//--Löschung
// OnClick für Standort löschen im Update-Screen
//TODO: ONclick für löscung button 
