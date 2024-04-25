import Slider from "../Slider/Slider";
import { useEffect } from "react";

//Komponent som viser sliderne for fuzzy logic

const SliderBox: React.FC = () => {
  useEffect(() => {
    //Setter dem til 5 når siden rendres inn
    localStorage.setItem("FuzzyDistance", "5");
    localStorage.setItem("FuzzySlope", "5");
    localStorage.setItem("FuzzySurface", "5");
  }, []);
  return (
    <div className="flex flex-row text-black mt-10 ml-10 gap-12 text-xs lg:text-lg">
      <Slider sliderType="FuzzyDistance"></Slider>
      <Slider sliderType="FuzzySlope"></Slider>
      <Slider sliderType="FuzzySurface"></Slider>
    </div>
  );
};

export default SliderBox;
