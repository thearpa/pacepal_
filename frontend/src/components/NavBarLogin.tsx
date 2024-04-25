import React from "react";

//Navbar før man logger inn. 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-cyan-100 p-8">
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex items-center mx-auto">
            <img
              src="/running_logo.png"
              alt="PacePal Logo"
              className="w-16 mr-4"
            />
            <div className="text-black font-bold text-4xl">PacePal</div>
          </div>
        </div>{" "}
      </div>
    </nav>
  );
};

export default Navbar;
