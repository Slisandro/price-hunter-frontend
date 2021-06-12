import React from "react";
import "./MarcasAsociadas.css";
import image1 from "../../assets/img/marcas/cocacola.png";
import image2 from "../../assets/img/logomarcas/chupachups.png";
import image3 from "../../assets/img/logomarcas/colgate.png";
import image4 from "../../assets/img/logomarcas/kelloggs.png";
import image5 from "../../assets/img/logomarcas/oreo.png";
import image6 from "../../assets/img/logomarcas/pepsi.png";
import image7 from "../../assets/img/logomarcas/nestle.png";
import image8 from "../../assets/img/logomarcas/mars.png";
import image9 from "../../assets/img/logomarcas/mondelez.png";
import image10 from "../../assets/img/logomarcas/unilever.png";

function MarcasAsociadas() {
  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
    }
    // slides[slideIndex - 1].style.display = "block";
    // dots[slideIndex - 1].className += " active";
  }

  return (
    <div className="marcasAsociadas">
      <h2 id="title">Marcas Asociadas</h2>
      <div className="slideshow-container">
        <a className="prev" onclick={plusSlides(-1)}>
          &#10094;
        </a>
        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image1}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image2}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image3}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img className="logoimagen" src={image4} alt="Not Found" />
        </div>

        <div className="mySlides fade">
          <img className="logoimagen" src={image5} alt="Not Found" />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image6}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image7}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image8}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image9}
            alt="Not Found"
          />
        </div>

        <div className="mySlides fade">
          <img
            className="logoimagen"
            src={image10}
            alt="Not Found"
          />
        </div>

        <a className="next" onclick={plusSlides(1)}>
          &#10095;
        </a>
      </div>
      <br></br>

      <div style={{ textAlign: "center" }}>
        <span className="dot" onclick={currentSlide(1)}></span>
        <span className="dot" onclick={currentSlide(2)}></span>
        <span className="dot" onclick={currentSlide(3)}></span>
      </div>
    </div>
  );
}

export default MarcasAsociadas;
