import "./main.css";
const API_KEY = "88de47e74939d0f42821a2d4fb9cdc90";
const content = document.getElementById("content");
const input = document.createElement("input");
input.id = "cityinput";
const search_button = document.createElement("button");
search_button.textContent = "Search";
content.appendChild(input);
content.appendChild(search_button);
async function get_weather_JSON(city_name) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=` +
      API_KEY,
    { mode: "cors" }
  );
  const weather_json = await response.json();
  console.log(weather_json);
  return weather_json;
}
search_button.onclick = async function () {
  const r = await get_weather_JSON(input.value);
  if (content.contains(document.getElementById("weatherinfo")))
    content.removeChild(document.getElementById("weatherinfo"));
  append_weather_details(
    r.main.temp,
    r.main.humidity,
    r.weather[0].main,
    r.wind.speed
  );
  // console.log(r.main.temp);
  // } catch {
  //   console.log("error");
  // }
};
function append_weather_details(temp, humidity, condition, wind_speed) {
  const container = document.createElement("div");
  container.id = "weatherinfo";
  const temp_div = document.createElement("div");
  const humidity_div = document.createElement("div");
  const condition_div = document.createElement("div");
  const wind_div = document.createElement("div");
  temp_div.textContent = temp;
  humidity_div.textContent = humidity;
  condition_div.textContent = condition;
  wind_div.textContent = wind_speed;
  container.appendChild(temp_div);
  container.appendChild(humidity_div);
  container.appendChild(condition_div);
  container.appendChild(wind_div);
  content.appendChild(container);
}
