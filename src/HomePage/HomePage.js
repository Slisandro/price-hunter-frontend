import NavBar from "./navBar/NavBar";
import Slider from "./Slider/Slider";
import Testimonios from "./Testimonios/Testimonios";
import Footer from "./Footer/Footer";
import Data from "../assets/fakedata";
import MarcasAsociadas from "./Marcas/MarcasAsociadas";

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
