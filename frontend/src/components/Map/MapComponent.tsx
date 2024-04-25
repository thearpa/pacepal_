import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as polyline from "polyline";
import * as turf from "@turf/turf";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

//Kartet som viser ruter

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlYXJwIiwiYSI6ImNscnl2OWQwdTFiZHoya3RrdmZsOGRrdmYifQ.0lwr7QdzAeGYV9PWmQ_AQw";

const MapComponent: React.FC<{ polylineString: string }> = ({
  polylineString,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const directionsClient = mbxDirections({ accessToken: mapboxgl.accessToken });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mapStyleOption, setMapStyleOption] = useState("streets-v12");

  //Funksjon som håndterer startpunktet for ruten
  function handleStartpoint(startPoint: string): [number, number] | null {
    const savedLocation = localStorage.getItem("currentLocation");
    switch (startPoint) {
      case "Moholt":
        return [10.432350202054835, 63.412829020011024];
      case "Solsiden":
        return [10.414906, 63.434559];
      case "Elgeseter":
        return [10.395404, 63.419479];
      case "Current Location":
        if (savedLocation) {
          const { latitude, longitude } = JSON.parse(savedLocation);
          return [longitude, latitude];
        } else {
          console.log("No current location saved in localStorage.");
          return null;
        }
      default:
        throw new Error("Invalid start point");
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${mapStyleOption}`,
      center: [10.407034, 63.416025],
      zoom: 12,
    });

    setMap(mapInstance);
    mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    mapInstance.on("load", () => {
      const coordinates = polyline
        .decode(polylineString)
        .map((coord) => [coord[1], coord[0]]);
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      };

      mapInstance.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      mapInstance.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#F97432",
          "line-width": 4,
        },
      });

      const startPoint = localStorage.getItem("startPoint");
      if (startPoint) {
        const startCoordinates = handleStartpoint(startPoint);
        if (startCoordinates) {
          const polylineFeature = turf.lineString(coordinates);
          const nearestPoint = turf.nearestPointOnLine(
            polylineFeature,
            turf.point(startCoordinates)
          );

          directionsClient
            .getDirections({
              profile: "walking",
              waypoints: [
                { coordinates: startCoordinates },
                { coordinates: nearestPoint.geometry.coordinates },
              ],
              geometries: "geojson",
            })
            .send()
            .then((response) => {
              const directionsData = response.body.routes[0].geometry;
              const routeLength = turf.length(directionsData);
              console.log("Route Length (km):", routeLength);
              mapInstance.addSource("directions-route", {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: directionsData,
                },
              });

              mapInstance.addLayer({
                id: "directions-route",
                type: "line",
                source: "directions-route",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#F97432",
                  "line-width": 5,
                  "line-dasharray": [2, 2],
                },
              });
            })
            .catch((err) => console.error("Error requesting directions:", err));
        }
      }
    });

    return () => mapInstance.remove();
  }, [polylineString, mapStyleOption]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="">
      <div className="mb-2">
        <div className="relative" style={{ width: "70vw", height: "30vh" }}>
          <div ref={mapContainerRef} className="h-[60vh] mr-5 mt-10" />
          <div className="absolute top-36 right-5 z-10">
            <button
              onClick={toggleDropdown}
              className="dropdown-button border bg-white border-gray-300 p-2 rounded-lg flex items-center justify-center cursor-pointer mr-2"
            >
              <FontAwesomeIcon
                icon={faLayerGroup}
                style={{ color: "#000000" }}
              />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48">
                <button
                  onClick={() => setMapStyleOption("streets-v12")}
                  className="text-left w-full px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100"
                >
                  Standard
                </button>
                <button
                  onClick={() => setMapStyleOption("satellite-streets-v11")}
                  className="text-left w-full px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100"
                >
                  Satellite view
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
