// Beim Laden der HTML Seite werden alle Funktionen ausgeführt
window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  button.innerText = "Objekt wechseln";
  let locations = loadLocations();
  createLocation(locations);
  setInterval(distanceCalc, 2000);
};

// Gibt alle angegebenen GPS-Standorte als Array zurück
function loadLocations() {
    return [
        {
            name: 'Ort 1',
            location: {
              lat: 52.583488,
              lng: 13.285750,
            },
        },
    ];
}

// Speichert 3D-Objekte und zugehörige Konfigurationen in einem Array
var models = [
  {
    url: "./assets/3dobjekte/wasistzukunftblau.glb",
    scale: "0.4 0.4 0.4",
    info: "Was ist Zukunft?",
    rotation: "0 0 0",
  },
  {
    url: "./assets/3dobjekte/wort-repair.glb",
    scale: "8 8 8",
    rotation: "0 0 0",
    info: "Repair",
  },
  {
    url: "./assets/3dobjekte/wort-dehumanization.glb",
    scale: "0.2 0.2 0.2",
    rotation: "0 0 0",
    info: "Dehumanization",
  },
    {
    url: "./assets/3dobjekte/wort-fragment.glb",
    scale: "8 8 8",
    rotation: "0 0 0",
    info: "Fragment",
  },
];


var modelIndex = 0;
var setModel = function (model, entity) {
  if (model.scale) {
    entity.setAttribute("scale", model.scale);
  }

  if (model.rotation) {
    entity.setAttribute("rotation", model.rotation);
  }

  if (model.position) {
    entity.setAttribute("position", model.position);
  }

  entity.setAttribute("gltf-model", model.url);

  const div = document.querySelector(".objecttitle");
  div.innerText = model.info;
};

// Lädt die GPS-Standorte und zugehörigen 3D-Objekte
function createLocation(locations) {
  let scene = document.querySelector("a-scene");

  locations.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;
    
    // Für jeden GPS-Standort und zugehörigem 3D-Objekt wird ein a-entity Element erzeugt
    let model = document.createElement("a-entity");
    model.setAttribute("gps-entity-place",`latitude: ${latitude}; longitude: ${longitude};`);

    setModel(models[modelIndex], model);

    model.setAttribute("animation-mixer", "");
    // Bei Klick des "Objekt wechseln"-Buttons wird der modelIndex um 1 erhöht und somit das nächste Objekt aus dem Arrays geladen und angezeigt
    document.querySelector('button[data-action="change"]').addEventListener("click", function () {
        var entity = document.querySelector("[gps-entity-place]");
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
      });

    scene.appendChild(model);
  });
}

// Gibt die Distanz des aktuellen GPS-Standorts des ausführenden Geräts zum GPS-Standort des 3D-Objekts zurück
function distanceCalc() {
  const distanceMsg = document.querySelector("[gps-entity-place]").getAttribute("distanceMsg");
  document.querySelector(".distance").innerHTML = "Distanz: " + distanceMsg;
}

var locationliste = "Lat: " + loadLocations()[0].location.lat + " Long: " + loadLocations()[0].location.lng;
document.getElementById("gpslocation").innerHTML = locationliste;