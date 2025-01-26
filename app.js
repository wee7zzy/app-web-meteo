const apiKey='cfdad4efde60910025dc92fb00b7c808';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiUrlDay='https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';


const searchbox=document.getElementById("Srch");
const searchbtn=document.getElementById("btn");

async function getWeather(url) {
    const response = await fetch(url);
    let data=await response.json();


    document.getElementById("tempM").innerHTML=Math.round(data.main.temp)  + "°C";
    document.getElementById("ville").innerHTML=data.name;
    document.getElementById("Con").innerHTML=data.sys.country;
    document.getElementById("hum").innerHTML=data.main.humidity + "%";
    document.getElementById("wd").innerHTML=data.wind.speed + "km/h";
    document.getElementById("descp").innerHTML=data.weather[0].description;
    document.getElementById("ImgP").src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    console.log(data);
}

async function getWeatherday(url) {
    const response = await fetch(url);
    let data=await response.json();

    for (let i = 1; i <= 5; i++) {
        const dayData = data.list[(i - 1)*8];
        

        document.getElementById(`jr${i}`).innerHTML=new Date(dayData.dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});
        document.getElementById(`temperature${i}`).innerHTML=dayData.main.temp  + "°C";
        document.getElementById(`Max${i}`).innerHTML="max : "+ dayData.main.temp_max+ "°";
        document.getElementById(`Min${i}`).innerHTML="min : "+ dayData.main.temp_min + "°";
        document.getElementById(`im${i}`).src= `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;

    }

    console.log(data);
}

function Localisation() {
    console.log("start local");

 
    if ("geolocation" in navigator) {
       /* geolocation is available */

       navigator.geolocation.getCurrentPosition((position) => {
          console.log("get position"+position.coords.latitude +""+position.coords.longitude);
 
          lat=position.coords.latitude;
          lon= position.coords.longitude;
            // start geting data from api 
            getWeatherday(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

 
        });

     }

}

searchbtn.addEventListener('click',()=>{

    const cityName = document.getElementById('Srch').value.trim();   
        const cityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    
        if (cityName === "") {
            alert("Le champ est vide. Veuillez entrer une ville.");
            return;
        }
    
        if (!cityRegex.test(cityName)) {
            alert("Nom de ville invalide. Veuillez réessayer avec un nom correct.");
            return;
        }

    getWeather(apiUrl+searchbox.value.trim()+ '&appid=' + apiKey);
    getWeatherday(apiUrlDay+searchbox.value.trim()+ '&appid=' +apiKey);
})

window.onload = () => {
    Localisation();
};








