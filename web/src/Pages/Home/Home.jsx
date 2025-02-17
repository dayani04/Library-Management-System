import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Carousel';
import Services from './Services';
import Card from './Card';
import About from './About';

const Home = () => {
    return (
        <>
     <Carousel/>
     <Services/>
     <About/>
     <Card/>
        </>
      );
    }
    export default Home; 