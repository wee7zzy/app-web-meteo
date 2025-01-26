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

    document.getElementById('btn').addEventListener('click', ()=> {
        
    
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
    
        console.log(`Recherche pour la ville : ${cityName}`);
    });
    
    console.log(data);
}

async function getWeatherday(url) {
    const response = await fetch(url  );
    let data=await response.json();
    

    document.getElementById("jr1").innerHTML=new Date(data.list[0].dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});
    document.getElementById("temperature1").innerHTML=data.list[0].main.temp  + "°C";
    document.getElementById("Max1").innerHTML="max : "+ data.list[0].main.temp_max+ "°";
    document.getElementById("Min1").innerHTML="min : "+ data.list[0].main.temp_min + "°";
    document.getElementById("im1").src= `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    document.getElementById("jr2").innerHTML=new Date(data.list[8].dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});    
    document.getElementById("temperature2").innerHTML=data.list[8].main.temp  + "°C";
    document.getElementById("Max2").innerHTML="max : "+ data.list[8].main.temp_max+ "°";
    document.getElementById("Min2").innerHTML="min : "+ data.list[8].main.temp_min + "°";
    document.getElementById("im2").src= `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;

    document.getElementById("jr3").innerHTML=new Date(data.list[16].dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});    
    document.getElementById("temperature3").innerHTML=data.list[16].main.temp  + "°C";
    document.getElementById("Max3").innerHTML="max : "+ data.list[16].main.temp_max+ "°";
    document.getElementById("Min3").innerHTML="min : "+ data.list[16].main.temp_min + "°";
    document.getElementById("im3").src= `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;

    document.getElementById("jr4").innerHTML=new Date(data.list[24].dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});    
    document.getElementById("temperature4").innerHTML=data.list[24].main.temp  + "°C";
    document.getElementById("Max4").innerHTML="max : "+ data.list[24].main.temp_max+ "°";
    document.getElementById("Min4").innerHTML="min : "+ data.list[24].main.temp_min + "°";
    document.getElementById("im4").src= `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`;

    document.getElementById("jr5").innerHTML=new Date(data.list[32].dt_txt).toLocaleDateString("fr-FR",{weekday: "long"});    
    document.getElementById("temperature5").innerHTML=data.list[32].main.temp  + "°C";
    document.getElementById("Max5").innerHTML="max : "+ data.list[32].main.temp_max+ "°";
    document.getElementById("Min5").innerHTML="min : "+ data.list[32].main.temp_min + "°";
    document.getElementById("im5").src= `http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`;

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
    getWeather(apiUrl+searchbox.value.trim()+ '&appid=' + apiKey);
    getWeatherday(apiUrlDay+searchbox.value.trim()+ '&appid=' +apiKey);
})

window.onload = () => {
    Localisation();
};








