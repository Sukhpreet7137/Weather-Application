const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorhandler=document.querySelector(".error-container");
const im=document.querySelector(".img-error");
const dailycontainer=document.querySelector(".container-2");
const searchInput = document.querySelector("[data-searchInput]");
let week=["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        searchInput.value="";
        dailycontainer.classList.remove("active");
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    dailycontainer.classList.remove("active");
    im.classList.remove("active");
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    im.classList.remove("active");
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();
        weatherreport2(lat,lon);
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        dailycontainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        im.classList.add("active");

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed}ms`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);


searchForm.addEventListener("submit", (e) => {
    im.classList.remove("active");
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        if(data?.message=='city not found') throw "404";
        weatherreport(city);
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        dailycontainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        dailycontainer.classList.remove("active");
        im.src="./assets/error2.png";
        im.classList.add("active");
        loadingScreen.classList.remove("active");
    }
}

let para1=document.querySelector("[p1]");
let para11=document.querySelector("[p11]");
let img1=document.querySelector("[img1]");
let temp1=document.querySelector("[temp1]");

let para2=document.querySelector("[p2]");
let para22=document.querySelector("[p22]");
let img2=document.querySelector("[img2]");
let temp2=document.querySelector("[temp2]");

let para3=document.querySelector("[p3]");
let para33=document.querySelector("[p33]");
let img3=document.querySelector("[img3]");
let temp3=document.querySelector("[temp3]");

let para4=document.querySelector("[p4]");
let para44=document.querySelector("[p44]");
let img4=document.querySelector("[img4]");
let temp4=document.querySelector("[temp4]");

let para5=document.querySelector("[p5]");
let para55=document.querySelector("[p55]");
let img5=document.querySelector("[img5]");
let temp5=document.querySelector("[temp5]");

let para6=document.querySelector("[p6]");
let para66=document.querySelector("[p66]");
let img6=document.querySelector("[img6]");
let temp6=document.querySelector("[temp6]");

let para7=document.querySelector("[p7]");
let para77=document.querySelector("[p77]");
let img7=document.querySelector("[img7]");
let temp7=document.querySelector("[temp7]");

let para8=document.querySelector("[p8]");
let para88=document.querySelector("[p88]");
let img8=document.querySelector("[img8]");
let temp8=document.querySelector("[temp8]");

async function weatherreport(city){
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        const  data = await response.json();
        console.log(data);
        renderWeatherInfo2(data);
    }
    catch(err){
        console.log(err);
    }
}
async function weatherreport2(lat,lon){
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const  data = await response.json();
        console.log(data);
        renderWeatherInfo2(data);
    }
    catch(err){
        console.log(err);
    }
}
weatherreport();
function renderWeatherInfo2(weatherInfo){
    let text=weatherInfo?.list[0]?.dt_txt;
    let date=text.slice(0,11);
    const data = new Date(date);
    const day1 = data.getDay();
    para1.innerText=text.slice(11,16);
    para11.innerText=week[day1]+'  '+text.slice(8,10);
    img1.src=`http://openweathermap.org/img/w/${weatherInfo?.list[0]?.weather?.[0]?.icon}.png`;
    temp1.innerText=(`${weatherInfo?.list[0]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text2=weatherInfo?.list[1]?.dt_txt;
    let date2=text2.slice(0,11);
    const data2 = new Date(date);
    const day2 = data2.getDay();
    para2.innerText=text2.slice(11,16);
    para22.innerText=week[day2]+'  '+text2.slice(8,10);
    img2.src=`http://openweathermap.org/img/w/${weatherInfo?.list[1]?.weather?.[0]?.icon}.png`;
    temp2.innerText=(`${weatherInfo?.list[1]?.main?.temp}`-273.15).toFixed(2)+'°C';


    let text3=weatherInfo?.list[2]?.dt_txt;
    let date3=text3.slice(0,11);
    const data3 = new Date(date3);
    const day3 = data3.getDay();
    para3.innerText=text3.slice(11,16);
    para33.innerText=week[day3]+'  '+text3.slice(8,10);
    img3.src=`http://openweathermap.org/img/w/${weatherInfo?.list[2]?.weather?.[0]?.icon}.png`;
    temp3.innerText=(`${weatherInfo?.list[2]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text4=weatherInfo?.list[3]?.dt_txt;
    let date4=text4.slice(0,11);
    const data4 = new Date(date4);
    const day4 = data4.getDay();
    para4.innerText=text4.slice(11,16);
    para44.innerText=week[day3]+'  '+text4.slice(8,10);
    img4.src=`http://openweathermap.org/img/w/${weatherInfo?.list[3]?.weather?.[0]?.icon}.png`;
    temp4.innerText=(`${weatherInfo?.list[3]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text5=weatherInfo?.list[4]?.dt_txt;
    let date5=text5.slice(0,11);
    const data5 = new Date(date5);
    const day5 = data5.getDay();
    para5.innerText=text5.slice(11,16);
    para55.innerText=week[day3]+'  '+text5.slice(8,10);
    img5.src=`http://openweathermap.org/img/w/${weatherInfo?.list[4]?.weather?.[0]?.icon}.png`;
    temp5.innerText=(`${weatherInfo?.list[4]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text6=weatherInfo?.list[5]?.dt_txt;
    let date6=text6.slice(0,11);
    const data6 = new Date(date6);
    const day6 = data6.getDay();
    para6.innerText=text6.slice(11,16);
    para66.innerText=week[day3]+'  '+text6.slice(8,10);
    img6.src=`http://openweathermap.org/img/w/${weatherInfo?.list[5]?.weather?.[0]?.icon}.png`;
    temp6.innerText=(`${weatherInfo?.list[5]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text7=weatherInfo?.list[6]?.dt_txt;
    let date7=text7.slice(0,11);
    const data7 = new Date(date7);
    const day7 = data7.getDay();
    para7.innerText=text7.slice(11,16);
    para77.innerText=week[day3]+'  '+text7.slice(8,10);
    img7.src=`http://openweathermap.org/img/w/${weatherInfo?.list[6]?.weather?.[0]?.icon}.png`;
    temp7.innerText=(`${weatherInfo?.list[6]?.main?.temp}`-273.15).toFixed(2)+'°C';

    let text8=weatherInfo?.list[7]?.dt_txt;
    let date8=text4.slice(0,11);
    const data8 = new Date(date8);
    const day8 = data8.getDay();
    para8.innerText=text8.slice(11,16);
    para88.innerText=week[day3]+'  '+text8.slice(8,10);
    img8.src=`http://openweathermap.org/img/w/${weatherInfo?.list[7]?.weather?.[0]?.icon}.png`;
    temp8.innerText=(`${weatherInfo?.list[7]?.main?.temp}`-273.15).toFixed(2)+'°C';
}
