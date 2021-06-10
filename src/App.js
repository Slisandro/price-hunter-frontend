import logo from "./logo.svg";
import "./App.css";
import fakedata from "./components/assets/fakedata";
import Footer from "./components/Footer";
import Testimonios from "./components/Testimonios.js";
import MarcasAsociadas from "./components/MarcasAsociadas";

function App() {
  return (
    <div className="App">
      <MarcasAsociadas />
      <Testimonios people={fakedata} />
      <Footer />
    </div>
  );
}

export default App;
