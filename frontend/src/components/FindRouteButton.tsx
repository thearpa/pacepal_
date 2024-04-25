import React from "react";

//Knapp for å finne egnet rute. Brukes i homePage.tsx

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const FindRoute: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-custom-green text-black font-semibold rounded-lg  hover:bg-cyan-100 focus:outline-none focus:ring-2 hover:border-cyan-200 focus:ring-opacity-75 text-xs lg:text-lg"
      style={{ width: "10vw", minWidth: "100px" }}
    >
      {label}
    </button>
  );
};

export default FindRoute;
