const apiKey = "9c294c5c6713201bfe17358259f7c685";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", getWeather);

async function getWeather(event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        weatherInfo.innerHTML = `<p class="text-danger">⚠️ Please enter a city name!</p>`;
        return;
    }
    weatherInfo.innerHTML = `<p>Loading weather data...</p>`;

    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found. Please check the name and try again.");
        }
        const data = await response.json();
        displayWeather(data);
        } catch (error) {
            weatherInfo.innerHTML = `<p class="text-danger">${error.message}</p>`;
        }
    }

    function displayWeather(data) {
    const { name, main, weather, timezone } = data;


    const localTime = new Date(Date.now() + timezone * 1000);
    const timeString = localTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    weatherInfo.innerHTML = `
        <div class="text-center">
        <h2 class="fw-bold">${name}</h2>
        <p class="fw-bold">Local time: ${timeString}</p>
        <p class="fs-3 mb-1">${main.temp.toFixed(1)}°C</p>
        <p class="text-capitalize">${weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" 
            alt="${weather[0].main}" class="mt-2" />
        </div>
    `;
    }
