const apiKey = "YOUR_API_KEY_HERE";

const cityInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loading = document.querySelector(".loading");

async function checkWeather(cityVal) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityVal}`;

    loading.style.display = "flex";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";


    try {
        const response = await fetch(apiUrl);

        loading.style.display = "none";

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerText = data.location.name;
        document.querySelector(".temp").innerText = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerText = data.current.humidity + "%";
        document.querySelector(".wind").innerText = data.current.wind_kph + " km/h";

        const condition = data.current.condition.text;

        const conditionMap = {
            "Clear": "clear.png",
            "Sunny": "clear.png",
            "Cloudy": "clouds.png",
            "Partly cloudy": "clouds.png",
            "Overcast": "clouds.png",
            "Rain": "rain.png",
            "Light rain": "rain.png",
            "Moderate rain": "rain.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png",
            "Fog": "mist.png",
            "Snow": "snow.png"
        };

        const conditionText = data.current.condition.text;
        weatherIcon.src = conditionMap[conditionText] || "clouds.png";


        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        checkWeather(cityInput.value);
    }
});
