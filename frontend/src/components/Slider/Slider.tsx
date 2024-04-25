import { useState, useEffect } from "react";
import { useLocalStorage } from "../../UseLocalStorage";

//Slider for å velge verdier til fuzzy logic

interface Sliderprops {
  sliderType: string;
}

const Slider: React.FC<Sliderprops> = ({ sliderType }) => {
  const [sliderStorage, setSliderStorage] = useLocalStorage(sliderType, "5");
  const [sliderValue, setSliderValue] = useState<number>(5);

  function getSliderValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    setSliderStorage(value);
  }

  useEffect(() => {
    console.log(localStorage.getItem(sliderType));
  }, [sliderStorage, sliderType]);

  return (
    <div className="flex justify-center text-black">
      <div>
        <input
          id="width"
          type="range"
          defaultValue="5"
          min="0"
          max="10"
          step="1"
          onChange={getSliderValue}
          style={{ width: "10vw" }}
        />
        <p className="font-semibold">
          {" "}
          {sliderType.split("Fuzzy").join("")}: {sliderValue}
        </p>
      </div>
    </div>
  );
};

export default Slider;
