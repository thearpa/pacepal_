import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map/MapComponent";
import { GiveRouteScore } from "../components/GiveRouteScore";
import * as turf from "@turf/turf";
import * as polyline from "polyline";
import FavoriteButton from "./FavoriteButton";

//Komponet som viser ruter og gir mulighet for å legge til i favoritter

const ShowRoute: React.FC = () => {
  const [routesData, setRoutesData] = useState<any[]>([]);
  const [polylineString, setPolyline] = useState<string>("");
  const [routeLength, setRouteLength] = useState<number | null>(null);
  const [routeSlope, setRouteSlope] = useState<number>(0);
  const [routeSurface, setRouteSurface] = useState<string>("");
  const [routeName, setRouteName] = useState<string>("");
  const [scoreList, setScoreList] = useState<number[][]>([]); //liste sortert synkende [pk, score]

  //Funksjon som returner avstanden fra startpunktet til ruten
  function calculateShortestPathDistance(
    polylineCoordinates: [],
    startPoint: number[]
  ) {
    const lineString = turf.lineString(polylineCoordinates);
    const point = turf.point(startPoint);
    const nearestPoint = turf.nearestPointOnLine(lineString, point);
    const distance = turf.distance(nearestPoint, point);
    return distance * 2 * 1000; //fram og tilbake
  }
  function setArray() {
    const score: number[][] = [];

    routesData.forEach((route) => {
      //Hente distansen til gitt rute
      const startCoordinates = [
        parseFloat(localStorage.getItem("startCoordinateLat")!),
        parseFloat(localStorage.getItem("startCoordinateLong")!),
      ];

      let polylineString = route.fields.polyline.toString();
      let stringWithSingleBackslashes = polylineString.replace(/\\\\/g, "\\");
      let polylineCoordinates = polyline
        .decode(stringWithSingleBackslashes)
        .map((coord) => [coord[1], coord[0]]);
      const extraDistance: number = calculateShortestPathDistance(
        polylineCoordinates,
        startCoordinates
      );
      const routeDist: number = parseFloat(route.fields.length) + extraDistance;
      const routeSlope: number = parseFloat(route.fields.slope);
      const routeSurface: string = route.fields.surface;
      let routeScore = GiveRouteScore(routeDist, routeSlope, routeSurface);

      score.push([route.pk, routeScore, routeDist]);
    });
    score.sort((a, b) => a[1] - b[1]);
    const topFive = score.slice(0, 7);

    setScoreList(topFive);
  }

  //Henter rutedata fra databasen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/routes");
        const jsonArray = JSON.parse(response.data);
        setRoutesData(jsonArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function getData(key: number) {
    const id = key;
    const route = routesData.find((item) => item.pk === id);
    if (route) {
      const polyline = route.fields.polyline;
      const length = route.fields.length;
      const slope = route.fields.slope;
      const surface = route.fields.surface;
      const name = route.fields.name;

      if (polyline) {
        const polylineString = polyline.toString();
        let stringWithSingleBackslashes = polylineString.replace(/\\\\/g, "\\");
        setPolyline(stringWithSingleBackslashes);
      }
      if (name) {
        setRouteName(name);
      }
      if (length) {
        setRouteLength(length);
      }
      if (slope) {
        setRouteSlope(slope);
      }
      if (surface) {
        setRouteSurface(surface);
      }
    } else {
      console.log("Route with id", id, "not found");
    }
  }

  routesData.map((route) => (
    <div key={route.pk} className="route-item">
      <p className="text-xl font-bold text-gray-900">{route.fields.name}</p>
      <p className="text-l font-medium text-gray-900">
        Distance: {(route.fields.length / 1000).toFixed(2)} km
      </p>
      <p className="text-l font-medium text-gray-900">
        Total elevation gain: {route.fields.slope} m
      </p>
      <p className="text-l font-medium text-gray-900">
        Surface: {route.fields.surface}
      </p>
    </div>
  ));

  useEffect(() => {
    if (Array.isArray(routesData) && routesData.length > 0) {
      setArray();
      if (scoreList.length > 0) {
        getData(scoreList[0][0]);
      }
    }
  }, [routesData]);

  return (
    <div className="flex ">
      {polylineString !== null ? (
        <Map polylineString={polylineString.toString()} />
      ) : (
        <p>No polyline data available</p>
      )}
      <style>
        {`
        ::-webkit-scrollbar {
          width: 20px; 
        }
        ::-webkit-scrollbar-track {
          background: #f0f0f0;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #888; 
          border-radius: 6px; 
          border: 3px solid #f0f0f0; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}
      </style>
      <div
        className="mt-10 bg-white flex flex-col space-y-5 overflow-y-auto"
        style={{ height: "60vh", width: "40vw", minWidth: "100px" }}
      >
        <p className="font-bold text-xl text-gray-900 justify-center">Routes</p>
        {scoreList.map(([pk, _, distance]) => {
          const route = routesData.find((item) => item.pk === pk);
          if (!route) return null;

          return (
            <div
              key={route.pk}
              className="bg-cyan-100 rounded-2xl shadow-lg flex flex-col items-center my-2 cursor-pointer"
              onClick={() => {
                getData(route.pk), console.log(pk);
              }}
            >
              <p className="font-bold text-gray-900 mt-4 text-xs lg:text-lg">
                {route.fields.name}
              </p>
              <p className="text-xs lg:text-lg  text-gray-900">
                Distance: {distance ? (distance / 1000).toFixed(2) + " km" : ""}
              </p>
              <p className="text-xs lg:text-lg  text-gray-900">
                Total elevation gain: {route.fields.slope} m
              </p>
              <p className="text-xs lg:text-lg  text-gray-900">
                Surface: {route.fields.surface}
              </p>
              <div>
                {pk !== null ? <FavoriteButton pk={pk} /> : <p>No Button</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ShowRoute;
