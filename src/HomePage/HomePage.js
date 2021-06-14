import NavBar from "./navBar/NavBar";
import Slider from "./Slider/Slider";
import Testimonios from "./Testimonios/Testimonios";
import Footer from "./Footer/Footer";
import Data from "../assets/fakedata";
import MarcasAsociadas from "./Marcas/MarcasAsociadas";
import Bot from "./Chatbot/Bot";

function HomePage() {
  return (
    <>
      <NavBar />
      <Slider />
      <MarcasAsociadas />
      <Testimonios people={Data} />
      <Bot />
      <Footer />
    </>
  );
}

export default HomePage;
