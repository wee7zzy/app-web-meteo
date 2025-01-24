const apiKey = 'cfdad4efde60910025dc92fb00b7c808';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=';
const apiUrlDay = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=';
const searchbox = document.getElementById("Srch");
const searchbtn = document.getElementById("btn");

// Fonction pour obtenir la météo basée sur la position géographique
async function getWeatherByLocation(lat, lon) {
    const response = await fetch(`${apiUrl}${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();

    // Vérification de la réponse
    if (data.cod === "404") {
        alert("Ville non trouvée !");
        return;
    }

    // Mise à jour des éléments HTML avec les données
    document.getElementById("tempM").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("ville").innerHTML = data.name;
    document.getElementById("Con").innerHTML = data.sys.country;
    document.getElementById("hum").innerHTML = data.main.humidity + "%";
    document.getElementById("wd").innerHTML = data.wind.speed + " km/h";
    document.getElementById("descp").innerHTML = data.weather[0].description;
    
    // Mise à jour de l'icône
    document.getElementById("ImgP").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    console.log(data);
}

// Fonction pour obtenir la prévision sur plusieurs jours basée sur la position géographique
async function getWeatherdayByLocation(lat, lon) {
    const response = await fetch(`${apiUrlDay}${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();

    // Vérification de la réponse
    if (data.cod !== "200") {
        alert("Erreur lors de la récupération des prévisions.");
        return;
    }

    // Mise à jour des prévisions pour 5 jours
    for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8];  // Chaque jour est à 8 heures d'intervalle dans l'API OpenWeather
        const dayElement = document.getElementById(`jr${i + 1}`);
        const tempElement = document.getElementById(`temperature${i + 1}`);
        const maxTempElement = document.getElementById(`Max${i + 1}`);
        const minTempElement = document.getElementById(`Min${i + 1}`);
        const iconElement = document.getElementById(`im${i + 1}`);

        // Mise à jour des informations pour chaque jour
        dayElement.innerHTML = new Date(dayData.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        tempElement.innerHTML = `${Math.round(dayData.main.temp)}°C`;
        maxTempElement.innerHTML = `max : ${Math.round(dayData.main.temp_max)}°`;
        minTempElement.innerHTML = `min : ${Math.round(dayData.main.temp_min)}°`;
        iconElement.src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
    }

    console.log(data);
}

// Fonction pour obtenir la position de l'utilisateur et afficher la météo
function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Appel des fonctions pour afficher la météo et les prévisions
            getWeatherByLocation(lat, lon);
            getWeatherdayByLocation(lat, lon);
        }, (error) => {
            console.error("Erreur lors de la récupération de la localisation : " + error.message);
            alert("Impossible de récupérer votre position. Veuillez activer la géolocalisation.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

// Appeler la fonction pour récupérer la localisation dès que la page se charge
window.onload = getLocationAndWeather;

// Lorsque l'utilisateur fait une recherche manuelle
searchbtn.addEventListener('click', () => {
    const city = searchbox.value.trim();
    getWeather(city);
    getWeatherday(city);
});

// Fonction pour obtenir la météo pour une ville spécifique (recherche manuelle)
async function getWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    // Vérification de la réponse
    if (data.cod === "404") {
        alert("Ville non trouvée !");
        return;
    }

    // Mise à jour des éléments HTML avec les données
    document.getElementById("tempM").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("ville").innerHTML = data.name;
    document.getElementById("Con").innerHTML = data.sys.country;
    document.getElementById("hum").innerHTML = data.main.humidity + "%";
    document.getElementById("wd").innerHTML = data.wind.speed + " km/h";
    document.getElementById("descp").innerHTML = data.weather[0].description;

    // Mise à jour de l'icône
    document.getElementById("ImgP").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    console.log(data);
}

// Fonction pour obtenir les prévisions pour une ville spécifique (recherche manuelle)
async function getWeatherday(city) {
    const response = await fetch(`${apiUrlDay}${city}&appid=${apiKey}`);
    const data = await response.json();

    // Vérification de la réponse
    if (data.cod !== "200") {
        alert("Erreur lors de la récupération des prévisions.");
        return;
    }

    // Mise à jour des prévisions pour 5 jours
    for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8];  // Chaque jour est à 8 heures d'intervalle dans l'API OpenWeather
        const dayElement = document.getElementById(`jr${i + 1}`);
        const tempElement = document.getElementById(`temperature${i + 1}`);
        const maxTempElement = document.getElementById(`Max${i + 1}`);
        const minTempElement = document.getElementById(`Min${i + 1}`);
        const iconElement = document.getElementById(`im${i + 1}`);

        // Mise à jour des informations pour chaque jour
        dayElement.innerHTML = new Date(dayData.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        tempElement.innerHTML = `${Math.round(dayData.main.temp)}°C`;
        maxTempElement.innerHTML = `max : ${Math.round(dayData.main.temp_max)}°`;
        minTempElement.innerHTML = `min : ${Math.round(dayData.main.temp_min)}°`;
        iconElement.src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
    }

    console.log(data);
}
