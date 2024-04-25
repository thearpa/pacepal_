import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CaretDown, CaretRight } from "phosphor-react";
import DropDown from "../Dropdown";
import FindRoute from "../FindRouteButton";
import SliderBox from "../Slider/SlidersBox";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../UseLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

//Viser kart og funksjonalitet på forside

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [userMarker, setUserMarker] = useState<mapboxgl.Marker | null>(null);
  const navigate = useNavigate();
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedSlope, setSelectedSlope] = useState("");
  const [selectedSurface, setSelectedSurface] = useState("");
  const [mapStyleOption, setMapStyleOption] = useState("streets-v12");
  const [startPoint, setStartPoint] = useLocalStorage("startPoint", "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Henter kart fra Mapbox
  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGhlYXJwIiwiYSI6ImNscnl2OWQwdTFiZHoya3RrdmZsOGRrdmYifQ.0lwr7QdzAeGYV9PWmQ_AQw";
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyleOption}`,
      center: [10.407034, 63.416025],
      zoom: 12,
    });
    newMap.addControl(new mapboxgl.NavigationControl());
    newMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    setMap(newMap);
    return () => newMap.remove();
  }, [mapStyleOption]);
  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
    setStartPoint(option);
    console.log(startPoint);
    setIsExpanded(false);

    if (!map) {
      console.error("Map object is not initialized.");
      return;
    }

    //Finner nåværende posisjon
    switch (option) {
      case "Current Location":
        if (navigator.geolocation && map) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              localStorage.setItem("startCoordinateLat", longitude.toString());
              localStorage.setItem("startCoordinateLong", latitude.toString());
              map.flyTo({ center: [longitude, latitude], zoom: 12 });
              console.log([longitude, latitude]);
              if (userMarker) userMarker.remove();
              const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
              setUserMarker(marker);
              localStorage.setItem(
                "currentLocation",
                JSON.stringify({ latitude, longitude })
              );
              console.log([longitude, latitude]);
            },
            (error) => console.error(error)
          );
        }
        break;

      //Finner posisjon til Moholt, Elgeseter og Solsiden
      case "Moholt":
        localStorage.setItem("startCoordinateLat", "10.432350202054835");
        localStorage.setItem("startCoordinateLong", "63.412829020011024");
        map.flyTo({
          center: [10.432350202054835, 63.412829020011024],
          zoom: 14,
        });
        if (userMarker) userMarker.remove();
        // eslint-disable-next-line no-case-declarations
        const Momarker = new mapboxgl.Marker()
          .setLngLat([10.432350202054835, 63.412829020011024])
          .addTo(map);
        setUserMarker(Momarker);
        break;
      case "Elgeseter":
        localStorage.setItem("startCoordinateLat", "10.395404");
        localStorage.setItem("startCoordinateLong", "63.419479");
        map.flyTo({ center: [10.395404, 63.419479], zoom: 14 });
        if (userMarker) userMarker.remove();
        // eslint-disable-next-line no-case-declarations
        const Elmarker = new mapboxgl.Marker()
          .setLngLat([10.395404, 63.419479])
          .addTo(map);
        setUserMarker(Elmarker);
        break;
      case "Solsiden":
        localStorage.setItem("startCoordinateLat", "10.414906");
        localStorage.setItem("startCoordinateLong", "63.434559");
        map.flyTo({ center: [10.414906, 63.434559], zoom: 14 });
        if (userMarker) userMarker.remove();
        // eslint-disable-next-line no-case-declarations
        const Somarker = new mapboxgl.Marker()
          .setLngLat([10.414906, 63.434559])
          .addTo(map);
        setUserMarker(Somarker);
        break;
      default:
        console.log("No action for this option");
    }
  };
  const handleFindRouteButton = () => {
    if (
      selectedOption &&
      selectedDistance &&
      selectedSlope &&
      selectedSurface
    ) {
      navigate("/routeDisplay");
    } else {
      alert("Please fill in all buttons");
    }
  };
  const updateSelectedDistance = (newValue: string) => {
    setSelectedDistance(newValue);
    console.log(newValue);

    localStorage.setItem("wantedDistance", newValue);
    console.log(localStorage.getItem("wantedDistance"));
  };
  const updateSelectedSlope = (newValue: string) => {
    setSelectedSlope(newValue);
    localStorage.setItem("wantedSlope", newValue);
  };
  const updateSelectedSurface = (newValue: string) => {
    setSelectedSurface(newValue);
    localStorage.setItem("wantedSurface", newValue);
  };
  const handleStyleChange = (styleId: string) => {
    setMapStyleOption(styleId);
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <div className="flex flex-row">
        <div
          className="mt-8 mb-8 font-semibold ml-12 self-center bg-zinc-200 flex items-center rounded-lg "
          style={{ width: "25vw", height: "15vh" }}
        >
          <p className="font-semibold text-black text-xs lg:text-lg text-center p-4">
            On a scale from 1-10, how important are the different variables:
          </p>
        </div>
        <SliderBox></SliderBox>
      </div>
      <div className=" flex justify-between mt-4 ml-12">
        <div className="flex flex-col space-y-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative flex items-center bg-slate-100 text-black font-semibold rounded-full shadow-md hover:bg-cyan-100 focus:outline-none focus:ring-2 hover:border-cyan-200 focus:ring-opacity-75 space-x-2 text-xs lg:text-lg"
            style={{ width: "20vw", minWidth: "100px" }}
          >
            {selectedOption || "Start"}
            {isExpanded ? (
              <CaretDown size={16} className="ml-2" />
            ) : (
              <CaretRight size={16} className="ml-2" />
            )}
          </button>
          {isExpanded && (
            <div
              className=" absolute mt-2 bg-gray-100 border rounded py-2 px-2 cursor-pointer text-black"
              style={{ zIndex: 100 }}
            >
              <ul>
                <li
                  className="hover:bg-cyan-100 text-xs lg:text-lg p-2"
                  onClick={() => handleSelectChange("Current Location")}
                >
                  Current Location
                </li>
                <li
                  className="hover:bg-cyan-100 text-xs lg:text-lg p-2"
                  onClick={() => handleSelectChange("Moholt")}
                >
                  Moholt
                </li>
                <li
                  className="hover:bg-cyan-100 p-2 text-xs lg:text-lg"
                  onClick={() => handleSelectChange("Solsiden")}
                >
                  Solsiden
                </li>
                <li
                  className="hover:bg-cyan-100 p-2 text-xs lg:text-lg"
                  onClick={() => handleSelectChange("Elgeseter")}
                >
                  Elgeseter
                </li>
              </ul>
            </div>
          )}
          <DropDown
            label={"Distance in km"}
            options={[
              "5",
              "8",
              "10",
              "15",
              "20",
              "25",
              "30",
              "40",
              "Any length",
            ]}
            onOptionSelect={updateSelectedDistance}
          ></DropDown>
          <DropDown
            label={"Elevation    "}
            options={["Any", "Flat", "Hill"]}
            onOptionSelect={updateSelectedSlope}
          ></DropDown>
          <div className="flex justify-start">
            <DropDown
              options={["Any", "Asphalt", "Terrain"]}
              label={"Surface"}
              onOptionSelect={updateSelectedSurface}
            ></DropDown>
          </div>
          <FindRoute
            label={"Find Route"}
            onClick={() => handleFindRouteButton()}
          />
        </div>

        <div className="">
          <div className="mb-2">
            <div className="relative" style={{ width: "70vw", height: "30vh" }}>
              <div ref={mapContainer} className=" h-[60vh] mr-10" />
              <div className="absolute top-36 right-10 z-10 ">
                <button
                  onClick={toggleDropdown}
                  className="dropdown-button border bg-white border-gray-300 p-2 rounded-lg flex items-center justify-center cursor-pointer mr-2"
                >
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    style={{ color: "#000000" }}
                  />
                </button>{" "}
                {/* Gjør at man kan velge mellom standard og satellite view */}
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
      </div>
    </div>
  );
};
export default Map;
