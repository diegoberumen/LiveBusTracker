
var marker = 0;
let latitude = 0
let longitude = 0
let coordinates = 0;

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
    console.log(locations);
    
    if (latitude === 0 && longitude === 0) {
        latitude = locations[0].attributes.latitude;
        longitude = locations[0].attributes.longitude;
        coordinates = [longitude, latitude];
        let redBus = document.getElementById("redMarker");
        redBus.classList.remove("hidden");
        marker = new mapboxgl.Marker({
            element: document.getElementById("redMarker")
        })
            .setLngLat(coordinates)
            .addTo(map);
    } else {
        latitude = locations[0].attributes.latitude;
        longitude = locations[0].attributes.longitude;
        coordinates = [longitude, latitude];
        marker.setLngLat(coordinates)
    }

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
