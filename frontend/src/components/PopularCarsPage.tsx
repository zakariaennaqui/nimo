import React from 'react';
import CarCard from './CarCard';
import { useCars } from '../context/CarContext';
import LoadingSpinner from './ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';

const PopularCarsPage: React.FC = () => {
  const { popularCars, loading, error } = useCars();

  if (loading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 py-3 px-4 rounded-lg text-center mb-6">
          <span className="text-red-500">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-blue-50 py-3 px-4 rounded-lg mx-auto mb-6 w-fit">
        <span className="text-blue-500 text-center text-2xl">POPULAR RENTAL DEALS</span>
      </div>
      {popularCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCars.map((car) => (
            <CarCard key={car._id} {...car} />
          ))}
          <Link to="/rental-deals" className="col-span-1 md:col-span-2 lg:col-span-4 text-center mt-6">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-200">
              View All Cars
              <BiArrowToRight className="inline-block ml-2" size={20} />
            </button>
            </Link>
        </div>
      ) : (
        <div className="text-center py-8 flex items-center justify-center flex-col">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M6 2v3" />
            <path d="M18 2v3" />
            <path d="M3 10h18" />
            <circle cx="10" cy="14" r="2" />
            <line x1="14" y1="12" x2="16" y2="16" />
            <line x1="16" y1="12" x2="14" y2="16" />
          </svg>
        </div>
        <p className="text-gray-500">No cars available at the moment</p>
      </div>
      )}
    </div>
  );
};

export default PopularCarsPage;