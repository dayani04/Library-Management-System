import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

export default function Carousel() {
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
    rtl: false,
    arrows: false
  };

  const carouselData = [
    { img: "/assets/img/home1.jpg", title: "A Smarter Way to Access and Manage Books", subtitle: "Your Digital Library, Anytime, Anywhere!", btnText: "Enjoy Your Book" },
    { img: "/assets/img/home2.jpg", title: "A Smarter Way to Access and Manage Books", subtitle: "Your Digital Library, Anytime, Anywhere!", btnText: "Enjoy Your Book"},
    { img: "/assets/img/home3.jpg",title: "A Smarter Way to Access and Manage Books", subtitle: "Your Digital Library, Anytime, Anywhere!", btnText: "Enjoy Your Book"},
  
  ];

  return (
    <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img className="carousel-image" src={item.img} alt={`Slide ${index + 1}`} />
            <div className="carousel-caption">
              {item.title && <h1 className="carousel-h1">{item.title}</h1>}
              {item.subtitle && <p className="carousel-subtitle">{item.subtitle}</p>}

              {/* Show "Book Now" button on every slide */}
              <button 
                className="carousel-btn" 
                onClick={() => navigate("/Events")}
              >
                {item.btnText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
      <button className="carousel-control-prev" onClick={previous}>‹</button>
      <button className="carousel-control-next" onClick={next}>›</button>
    </div>
  );
}
