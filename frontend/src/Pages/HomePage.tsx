import Navbar from "../components/Navbar";
import Map from "../components/Map/Map";
import Footer from "../components/Footer";

//Hovedside

function HomePage() {
  return (
    <div className="App">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Map></Map>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
