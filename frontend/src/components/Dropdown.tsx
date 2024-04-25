import { useState } from "react";
import { CaretDown, CaretRight } from "phosphor-react";
import React from "react";

//Dropdown for å velge mellom alternativer

interface DropDownProps {
  label: string;
  options: string[];
  onOptionSelect: (selected: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  onOptionSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleOptionClick = (option: string) => {
    setSelectedItem(option);
    setIsExpanded(false);
    onOptionSelect(option);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center  bg-slate-100 text-black font-semibold rounded-full shadow-md hover:bg-cyan-100 focus:outline-none focus:ring-2 hover:border-cyan-200 focus:ring-opacity-75 space-x-2 mr-5 text-xs lg:text-lg"
        style={{ width: "20vw", minWidth: "100px" }}
      >
        {label}
        {selectedItem && `: ${selectedItem}`}
        {isExpanded ? (
          <CaretDown size={16} className="ml-2" />
        ) : (
          <CaretRight size={16} className="ml-2" />
        )}
      </button>
      {isExpanded && (
        <div className="absolute mt-2 bg-gray-100 border rounded py-2 px-2 cursor-pointer w-40 z-10 text-black text-xs lg:text-lg">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className="hover:bg-cyan-100 p-2"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
