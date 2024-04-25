import { useEffect, useState } from 'react';
import axios from 'axios';
import Map from "../components/Map/MapComponent";
import { GiveRouteScore } from "../components/GiveRouteScore";

//komponent som viser best egnede ruter. Brukes i ShowRoute.tsx
const ShowBestRoutes: React.FC = () => {
  const [routesData, setRoutesData] = useState<any[]>([]);
  const [polylineString, setPolyline] = useState<string>("");
  const [scoreList, setScoreList] = useState<number[][]>([]);


  function setArray(){
    const score: number[][] = [];
    
    routesData.forEach(route => {
      const routeDist: number  = parseFloat(route.fields.length);
      const routeSlope: number = parseFloat(route.fields.slope);
      const routeSurface: string = route.fields.surface;
  
      let routeScore = GiveRouteScore(routeDist, routeSlope, routeSurface);
      score.push([route.pk, routeScore]);   
    });
    score.sort((a, b) => a[1] - b[1]); // Sort scoreList based on score
    setScoreList(score);
  }

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/routes');
        const jsonArray = JSON.parse(response.data); 
        setRoutesData(jsonArray);    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Call setArray and getData when scoreList is updated
    setArray(); 
  }, [routesData]); // Watch for changes in routesData

  useEffect(() => {
    // Fetch data for the route with the lowest score
    if (scoreList.length > 0) {
      getData(scoreList[0][0]);//Uses the polyline for the best route
      console.log(scoreList);
      
    }
  }, [scoreList]); // Watch for changes in scoreList

  function getData(key: number) {
    const id = key;
    const route = routesData.find(item => item.pk === id);
    if (route) {
      const polyline = route.fields.polyline;
      if (polyline) {
        const polylineString = polyline.toString();
        let stringWithSingleBackslashes = polylineString.replace(/\\\\/g, "\\");
        setPolyline(stringWithSingleBackslashes);
      }
    } else {
      console.log('Route with id', id, 'not found');
    }
  } 

  return (
    <div>
      {polylineString !== null ? (
        <Map polylineString={polylineString.toString()} />
      ) : (
        <p>No polyline data available</p>
      )}
    </div>
  );
};

export default ShowBestRoutes;
