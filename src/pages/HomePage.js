import NavBar from './NavBar';
import Slider from './Slider';
import Testimonios from './Testimonios';
import Footer from './Footer';
import Data from "../assets/fakedata"

function HomePage() {
    return (
        <>
            <NavBar />
            <Slider />
            <Testimonios people={Data} />
            <Footer />
        </>
    )
}

export default HomePage;