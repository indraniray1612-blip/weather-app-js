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

        if (!response.ok) {
            loading.style.display = "none";
            document.querySelector(".error").style.display = "block";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerText = data.location.name;
        document.querySelector(".temp").innerText =
            Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerText =
            data.current.humidity + "%";
        document.querySelector(".wind").innerText =
            data.current.wind_kph + " km/h";

        const conditionMap = {
            "Clear": "images/clear.png",
            "Sunny": "images/clear.png",
            "Partly cloudy": "images/clouds.png",
            "Cloudy": "images/clouds.png",
            "Overcast": "images/clouds.png",
            "Rain": "images/rain.png",
            "Light rain": "images/rain.png",
            "Moderate rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png",
            "Fog": "images/mist.png",
            "Snow": "images/snow.png"
        };

        const conditionText = data.current.condition.text;
        weatherIcon.src = conditionMap[conditionText] || "images/clouds.png";

        loading.style.display = "none";
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        loading.style.display = "none";
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value);
    }
});