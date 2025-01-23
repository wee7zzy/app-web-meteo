const apiKey='cfdad4efde60910025dc92fb00b7c808';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=rabat';

async function getWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}` );
    let data=await response.json();

    document.getElementById("tempM").innerHTML=data.main.temp + "°C";
    document.getElementById("ville").innerHTML=data.name;
    document.getElementById("hum").innerHTML=data.main.humidity + "%";
    document.getElementById("wd").innerHTML=data.wind.speed + "km/h";
    document.getElementById("ImgP").innerHTML=data.weather[0].icon + "km/h";


    console.log(data);
}

getWeather();