// FUNCTIONING
// Calls the div where HTML will be displayed.
const container = document.querySelector("#parkContainer");

// FUNCTIONING
// Defines a template for HTML, so when data is passed in, it appends to the DOM.
const htmlFactory = (name, state, visited, summary, temp) => {
    return `
    <article class="park-visited-${visited}">
    <h3>${name}</h3>
    <h4>${state}</h4>
    <p>${summary}</p>
    <p>Current temperature: ${temp}F°</p>
    </article>
    `
}

// FUNCTIONING
// A fetch from the National Parks API, that brings back and defines name, state, longitude, and latitude.
const getData = () => {
    fetch("https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json")
    .then(parks => parks.json())
    .then(parsedParks => {
        for(i = 0 ; i < parsedParks.parks.length; i++) {
            let parkName = parsedParks.parks[i].name;
            let parkState = parsedParks.parks[i].state;
            let parkLong = parsedParks.parks[i].longitude;
            let parkLat = parsedParks.parks[i].latitude;
            let parkVisited = parsedParks.parks[i].visited;
            // a fetch call from Dark Skies API, that brings back and defines the daily summary and temperature of each park. At the end, it calls the htmlFactory function and appends data to the DOM.
            fetch(`https://api.darksky.net/forecast/${darkSkiesToken}/${parkLat},${parkLong}`)
            .then(weatherResults => weatherResults.json())
            .then(parsedWeather => {
                let dailySummary = parsedWeather.daily.summary;
                let currentTemp = parsedWeather.currently.temperature;
                container.innerHTML += htmlFactory(parkName, parkState, parkVisited, dailySummary, currentTemp);
                })
    }})
}

// FUNCTIONING
// Grabs the newly defined article tags from the div container.
let articles = container.getElementsByTagName("article");

// FUNCTIONING
// Calls function that pulls everything together
getData();




