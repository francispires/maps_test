import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MyMap(){
    async function initMap() {
        // Request needed libraries.
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const myLatlng = { lat: -25.363, lng: 131.044 };

        const map = new google.maps.Map(document.getElementById("map")!, {
            zoom: 4,
            center: myLatlng,
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        const origin = {"lat": -23.49436278351709, "lng": -46.544176460821014};
        const destination = {"lat": -23.49456510882947, "lng": -46.54393273539675};

        directionsRenderer.setMap(map);
        await directionsService.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });


        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
            content: "Click the map to get Lat/Lng!",
            position: myLatlng,
        });

        infoWindow.open(map);

        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
            // Close the current InfoWindow.
            infoWindow.close();

            // Create a new InfoWindow.
            infoWindow = new google.maps.InfoWindow({
                position: mapsMouseEvent.latLng,
            });
            infoWindow.setContent(
                JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
            );
            infoWindow.open(map);
        });
    }

    initMap();

    return (
        <>
            <div id="map"></div>
        </>
    );
}

function App() {
  const [count, setCount] = useState(0);

    

  return (
      <>
          <div>
              <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <h1>Vite + React</h1>
          <MyMap />
          <div className="card">
              <div id="map"></div>
              <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
              <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
              </p>
          </div>
          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
      </>
  )
}

export default App
