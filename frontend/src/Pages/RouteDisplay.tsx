import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShowRoute from "../components/ShowRoute";

//Viser anbefalte ruter

function RouteDisplay() {
  return (
    <div>
      <div className="max-h-screen">
        <Navbar />
        <ShowRoute></ShowRoute>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default RouteDisplay;
