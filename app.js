const apiKey='cfdad4efde60910025dc92fb00b7c808';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchbox=document.getElementById("Srch");
const searchbtn=document.getElementById("btn");

async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}` );
    let data=await response.json();

    document.getElementById("tempM").innerHTML=Math.round(data.main.temp)  + "°C";
    document.getElementById("ville").innerHTML=data.name;
    document.getElementById("hum").innerHTML=data.main.humidity + "%";
    document.getElementById("wd").innerHTML=data.wind.speed + "km/h";
    document.getElementById("descp").innerHTML=data.weather[0].description;
    document.getElementById("ImgP").src=document.getElementById("ImgP").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    console.log(data);
}
searchbtn.addEventListener('click',()=>{
    getWeather(searchbox.value.trim());
})




