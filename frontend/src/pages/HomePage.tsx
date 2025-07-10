import { BsGooglePlay } from 'react-icons/bs';
import { IoLogoApple } from 'react-icons/io';
import car from "../assets/car.png";
import jag1 from "../assets/jag1.png";
import image11 from "../assets/image 11.png";
import image12 from "../assets/image 12.png";
import audi from "../assets/Audi 1.svg";
import SearchHome from '../components/SearchHome';
import ProcessSteps from '../components/ProcessSteps';
import PopularCarRentalDeals from '../components/PopularCarsPage';
import { defaultSteps } from '../assets/constants';
// import WhyChooseUs from './WhyChooseUs';
import Testimonials from '../components/Testimonials';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarLogoCarousel from '../components/CarLogoCarousel';
import DownloadApp from '../components/DownloadApp';

const carImages = [
  car, jag1 , audi, image11, image12
  
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Effect to change the image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 5000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center min-h-screen py-12 md:py-0">
          {/* Text Content */}
          <div className="flex flex-col gap-6 mt-8 md:mt-0 text-center md:text-left max-w-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              Find, book and <br className="hidden sm:block" />
              rent a car <span className="text-blue-500">Easily</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700">
              Get a car wherever and whenever you need it with your iOS and Android device
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-2">
              {/* Google Play Button */}
              <a href="#" className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                <BsGooglePlay className="text-2xl sm:text-3xl" />
                <div className="flex flex-col">
                  <span className="text-xs font-light">Get it on</span>
                  <span className="text-base font-medium">Google Play</span>
                </div>
              </a>

              {/* App Store Button */}
              <a href="#" className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                <IoLogoApple className="text-2xl sm:text-3xl" />
                <div className="flex flex-col">
                  <span className="text-xs font-light">Download on</span>
                  <span className="text-base font-medium">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Car Image Carousel */}
          <div className="w-full md:w-1/2 flex justify-center overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={carImages[currentImageIndex]}
                alt={`Car rental illustration ${currentImageIndex + 1}`}
                className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            
            {/* Optional: Car model indicator dots */}
            {carImages.length > 1 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 mb-4">
                {carImages.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-16 lg:-mt-24 mb-12 relative z-10">
        <SearchHome />
      </div>
      
      <ProcessSteps subtitle="How it works" defaultSteps={defaultSteps} className='justify-center items-center flex-col' className2='grid grid-cols-1' className3='flex-col' />

            <CarLogoCarousel/>
      <hr className='border-t border-gray-200 my-6' />
      {/* <div className='flex flex-col  sm:flex-col md:flex-col lg:flex-row gap-6 items-center justify-center'>
        
         <WhyChooseUs/>
      </div> */}

      <PopularCarRentalDeals />
      <hr className='text-gray-100' />
      <Testimonials/>
      <DownloadApp/>
    </div>
  );
};

export default HomePage;