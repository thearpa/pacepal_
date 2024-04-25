import { useEffect, useState } from "react";
import axios from "axios";

//Knapp som legger til rute i favoritter. Brukes i ShowRoute.tsx

const FavoriteButton: React.FC<{ pk: number }> = ({ pk }) => {
  const [userData, setUserData] = useState<any[]>([]);
  const [favoriteData, setFavoriteData] = useState<any[]>([]);
  const storedMail = localStorage.getItem("email");
  const [isDisabled, setIsDisabled] = useState(false);

  function setDisabled() {
    console.log("Jeg kjører");

    if (!isDisabled) {
      setIsDisabled(true);
    }
  }

  //Funksjon som returner avstanden fra startpunktet til ruten. Henter fra databasen
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        const jsonArray = JSON.parse(response.data);
        setUserData(jsonArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataUser();
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const user = userData.find((item) => item.fields.email === storedMail);
      if (user) {
        console.log(user.fields.email, "DETTE ER MAIL");
        console.log("routeId : " + pk);

        if (user.fields.email && pk) {
          console.log("Kjører if");

          const usermail = user.fields.email;
          const routeid = pk;
          // Kontroller at både userid og routeid er satt
          const favoriteData = { routeid, usermail };

          fetch("http://127.0.0.1:8000/api/add-favorites/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(favoriteData),
          })
            .then((response) => {
              if (response.ok) {
                usermail;
                return response.json();
              } else {
                throw new Error(
                  "Noe gikk galt med serverresponsen: " + response.status
                );
              }
            })
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Sjekker om favoritten allerede er lagret
    const user = userData.find((item) => item.fields.email === storedMail);
    if (
      favoriteData.some(
        (favorite) =>
          favorite.fields.routeid === pk &&
          favorite.fields.usermail === storedMail
      )
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [favoriteData, pk]);

  return (
    <button
      className={`ml-4 p-2 mt-2 rounded-full mb-4 ${
        isDisabled ? "bg-gray-400 text-gray-700" : "bg-red-400 text-white"
      }`}
      onClick={(event) => {
        handleSubmit(event);
        setDisabled();
      }}
      disabled={isDisabled}
    >
      ♡Favorite
    </button>
  );
};
export default FavoriteButton;
