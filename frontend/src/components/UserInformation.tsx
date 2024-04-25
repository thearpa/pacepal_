import axios from "axios";
import { useEffect, useState } from "react";

//Brukes i AccountPage. Henter ut unformasjon om bruker fra databasen.

const UserInformation: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);
  const [favoriteData, setFavoriteData] = useState<any[]>([]);
  const [favoriteRoutes, setFavoriteRoutes] = useState<number[]>([]);
  const [routesData, setRoutesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/favorites");
        const jsonArray = JSON.parse(response.data);
        setFavoriteData(jsonArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataUser();
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        let data = response.data;
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
        if (Array.isArray(data)) {
          setUserData(data);
        } else {
          console.error("Expected an array but got:", typeof data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedMail = localStorage.getItem("email");
    if (storedMail && Array.isArray(userData)) {
      const user = userData.find((u) => u.fields.email === storedMail);
      if (user) {
        setName(user.fields.name);
        setEmail(user.fields.email);
        setPassword(user.fields.password);
      }
      if (favoriteData) {
        const favorites = [];
        const userFavorites = favoriteData.filter(
          (favorite) => favorite.fields.usermail === storedMail
        );
        for (let i = 0; i < userFavorites.length; i++) {
          const routeId = userFavorites[i].fields.routeid;
          favorites.push(routeId);
        }
        setFavoriteRoutes(favorites);
      }
      console.log(favoriteRoutes);
    }
  }, [userData]);

  return (
    <div className="flex  items-start mt-10 justify-center">
      <div
        className=" pl-10  px-10 mt-5 border-4 text-black font-semibold rounded-lg size-5 flex justify-between"
        style={{ width: "30vw", height: "50vh" }}
      >
        <div className="flex flex-col">
          <h2 className="text-black text-xs lg:text-lg font-bold mt-10">
            User Information
          </h2>
          <p className="text-xs lg:text-lg mt-4 text-black">Name: {name}</p>
          <p className="text-xs lg:text-lg mt-4">Email: {email}</p>
          <p className="text-xs lg:text-lg mt-4">Password: {password}</p>
        </div>
      </div>

      <div className="flex-col ml-20 rounded-lg ">
        <p className="font-bold  justify-center mt-10 text-black text-xs lg:text-lg ml-12 ">
          Favorite routes
        </p>

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
          className="mt-4 flex flex-col space-y-5 overflow-y-auto ml-2 "
          style={{ height: "35vh", width: "40vw", minWidth: "100px" }}
        >
          {favoriteRoutes.map((routeId) => {
            const route = routesData.find((item) => item.pk === routeId);
            if (!route) return null; // Skip rendering if route is not found

            return (
              <div
                key={route.pk}
                className=" rounded-3xl  flex flex-col items-center my-2 bg-zinc-200"
              >
                <p className="font-bold text-gray-900 text-xs lg:text-lg">
                  {route.fields.name}
                </p>
                <p className="text-xs lg:text-lg  text-gray-900">
                  Distance: {(route.fields.length / 1000).toFixed(2) + " km"}
                  {/*Legge til ekstra distanse */}
                </p>
                <p className="text-xs lg:text-lg  text-gray-900">
                  Total elevation gain: {route.fields.slope} m
                </p>
                <p className="text-xs lg:text-lg  text-gray-900">
                  Surface: {route.fields.surface}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
