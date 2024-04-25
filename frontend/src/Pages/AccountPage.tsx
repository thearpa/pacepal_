import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UserInformation from "../components/UserInformation";

//Min side

function HomePage() {
  return (
    <div className="App">
      <div className="min-h-screen">
        <Navbar />
        <UserInformation />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
