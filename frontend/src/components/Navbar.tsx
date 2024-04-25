import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

//Navbar for bruker som er logget inn

const Navbar: React.FC = () => {
  const storedName = localStorage.getItem("name");
  const storedEmail = localStorage.getItem("email");
  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <nav className="bg-cyan-100 p-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow">
          <div
            className="flex justify-center"
            onClick={() => navigate("/homepage")}
          >
            <img
              src="/running_logo.png"
              alt="PacePal Logo"
              className=" mr-4  cursor-pointer"
              style={{ width: "4vw", minWidth: "40px" }}
            />
            <div className="text-black  lg:text-4xl sm:text-sm font-bold cursor-pointer">
              PacePal
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {name && (
            <div
              className=" text-xs lg:text-lg 2xl:text-2xl text-black mr-0 cursor-pointer"
              onClick={toggleDropdown}
            >
              {name}
            </div>
          )}
          <div className="relative">
            <button
              type="button"
              className="flex text-xl bg-cyan-100 rounded-full"
              id="user-menu-button"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={toggleDropdown}
            >
              <img
                className="rounded-full"
                src="profileIcon.png"
                alt="user photo"
                style={{ width: "3vw", minWidth: "30px" }}
              />
            </button>
            <div
              className={`absolute right-0 z-50 mt-2 py-2 w-48 bg-white rounded-md shadow-xl ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">{name}</span>
                <span className="block text-sm text-gray-500 truncate">
                  {email}
                </span>
              </div>
              <ul className="py-1">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs lg:text-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/account")}
                  >
                    Profile page
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs lg:text-lg text-gray-700 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            className="bg-cyan-100 text-black text-xs lg:text-lg 2xl:text-2xl"
            onClick={() => navigate("/homepage")}
          >
            <FontAwesomeIcon icon={faHouse} style={{ width: "3vw" }} />
            {"  "}
            Home
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
