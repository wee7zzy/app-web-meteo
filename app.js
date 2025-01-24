const apiKey='cfdad4efde60910025dc92fb00b7c808';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiUrlDay='https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const searchbox=document.getElementById("Srch");
const searchbtn=document.getElementById("btn");


async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}` );
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

async function getWeatherday(city) {
    const response = await fetch(apiUrlDay + city + `&appid=${apiKey}` );
    let data=await response.json();

    document.getElementById("jr1").innerHTML=data.list[0].dt_txt  + "°C";
    document.getElementById("temperature1").innerHTML=data.list[0].main.temp  + "°C";
    document.getElementById("Max1").innerHTML="max : "+ data.list[0].main.temp_max+ "°";
    document.getElementById("Min1").innerHTML="min : "+ data.list[0].main.temp_min + "°";
    document.getElementById("im1").src= `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    document.getElementById("jr2").innerHTML=data.list[1].dt_txt  + "°C";
    document.getElementById("temperature2").innerHTML=data.list[1].main.temp  + "°C";
    document.getElementById("Max2").innerHTML="max : "+ data.list[1].main.temp_max+ "°";
    document.getElementById("Min2").innerHTML="min : "+ data.list[1].main.temp_min + "°";
    document.getElementById("im2").src= `http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`;

    document.getElementById("jr3").innerHTML=data.list[2].dt_txt  + "°C";
    document.getElementById("temperature3").innerHTML=data.list[2].main.temp  + "°C";
    document.getElementById("Max3").innerHTML="max : "+ data.list[2].main.temp_max+ "°";
    document.getElementById("Min3").innerHTML="min : "+ data.list[2].main.temp_min + "°";
    document.getElementById("im3").src= `http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`;

    document.getElementById("jr4").innerHTML=data.list[3].dt_txt  + "°C";
    document.getElementById("temperature4").innerHTML=data.list[3].main.temp  + "°C";
    document.getElementById("Max4").innerHTML="max : "+ data.list[3].main.temp_max+ "°";
    document.getElementById("Min4").innerHTML="min : "+ data.list[3].main.temp_min + "°";
    document.getElementById("im4").src= `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`;

    document.getElementById("jr5").innerHTML=data.list[4].dt_txt  + "°C";
    document.getElementById("temperature5").innerHTML=data.list[4].main.temp  + "°C";
    document.getElementById("Max5").innerHTML="max : "+ data.list[4].main.temp_max+ "°";
    document.getElementById("Min5").innerHTML="min : "+ data.list[4].main.temp_min + "°";
    document.getElementById("im5").src= `http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`;

    console.log(data);
}

searchbtn.addEventListener('click',()=>{
    getWeather(searchbox.value.trim());
    getWeatherday(searchbox.value.trim());
})




