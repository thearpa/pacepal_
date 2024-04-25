import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Komponent for registrering av bruker. Brukes i RegisterPage.tsx. Lagrer bruker i databasen.

function RegisterInput() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: mail,
      password: password,
    };

    fetch("http://127.0.0.1:8000/api/add-user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error("Noe gikk galt med serverresponsen: " + response.status);
      }
    })
    .then((data) => {
      console.log("Success:", data);
      navigate("/"); 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }    

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default RegisterInput;
