const btn = document.querySelector("#form-btn");
const ipInput = document.querySelector("#inputBtn");
const intialLocation = [5.652426305999822, -0.1880851446149894]; //UGCS location
const ipDisplay = document.querySelector("#ip_div");
const countryDisplay = document.querySelector("#country_div");
const cityDisplay = document.querySelector("#city_div");
const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

btn.addEventListener("click", () => {
    if(ipRegex.test(ipInput.value)){
        //if input is a valid IP Address...
        fetch(`https://ipinfo.io/${ipInput.value}?token=54737db2987f24`)
        .then(response => response.json())
        .then(data => {
            try {
            //get the latitude and longitude...
            let location = data.loc.split(",");
            let lat = location[0];
            let long = location[1];

            //display ip data
            ipDisplay.innerHTML = `${data.ip}`;
            countryDisplay.innerHTML = `${data.country}`;
            cityDisplay.innerHTML = `${data.city}`;

            //fly to new location
            map.flyTo([lat, long], 17);

            //remove initial marker
            map.removeLayer(initialMarker);

            //new marker
            let newMarker = new L.Marker([lat, long]);
            newMarker.addTo(map);
            newMarker.bindPopup(`${data.org}`);
            } catch (error) {
                if(error instanceof TypeError) {
                    alert("Enter a public IP Address");
                }
            }


        })
    } else {
        alert("Enter a valid IP Address")
    }
    
})

//Initial map render location is UGCS
var map = L.map('map').setView(intialLocation, 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
//marker marker to map
var initialMarker = new L.Marker(intialLocation);
initialMarker.addTo(map);
//add marker popup
initialMarker.bindPopup("University of Ghana Computing Systems (UGCS)")