import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Komponent for innlogging av bruker. Brukes i LogInPage.tsx. Sjekker om bruker eksisterer i databasen.
const LoginButtons = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        const jsonArray = JSON.parse(response.data);
        setUserData(jsonArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = userData.find((item) => item.fields.email === email);
      console.log(user);
      if (user && password === user.fields.password) {
        console.log("Login successful", user.fields.name);
        localStorage.setItem("name", user.fields.name);
        localStorage.setItem("email", user.fields.email);
        localStorage.setItem("password", user.fields.password);

        navigate("/homepage");
      } else {
        alert(
          "Wrong email or password. If you do not have an account, please register."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login");
      navigate("/register");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 mx-auto max-w-4xl bg-custom-green rounded-3xl  sm:py-8 sm:px-6 sm:items-center sm:space-y-0 sm:space-x-6"
      style={{ height: "60vh", width: "40vw", minWidth: "300px" }}
    >
      <h1 className="text-black text-3xl font-bold text-center mt-2">Log In</h1>
      <div className="grid gap-6 mb-6">
        <div>
          <label
            htmlFor="input-group-1"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="input-password"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="input-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="••••••••"
            required
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="mt-10 bg-custom-blue hover:bg-custom-hoverblue text-black font-medium rounded-lg text-sm px-10 py-2.5 text-center"
          style={{ width: "10vw", minWidth: "100px" }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-10 bg-custom-pink hover:bg-custom-hoverpink text-black font-medium rounded-lg text-sm px-10 py-2.5 text-center"
          style={{ width: "10vw", minWidth: "100px" }}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginButtons;
