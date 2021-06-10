import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Testimonios from "../components/Testimonios";
import Footer from "../components/Footer";
import Data from "../assets/fakedata";
import MarcasAsociadas from "../components/MarcasAsociadas";

function HomePage() {
  return (
    <>
      <NavBar />
      <Slider />
      <MarcasAsociadas />
      <Testimonios people={Data} />
      <Footer />
    </>
  );
}

export default HomePage;
