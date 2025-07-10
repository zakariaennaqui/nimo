// src/components/CarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen } from 'react-icons/fa';
import { Car } from '../context/CarContext';

const CarCard: React.FC<Car> = ({
  _id,
  name,
  images,
  rating,
  passengers,
  transmission,
  airConditioning,
  doors,
  price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img 
          src={images && images.length > 0 ? images[0] : '/placeholder-car.jpg'} 
          alt={name} 
          className="w-full h-full scale-75 object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold mr-1">{rating}</span>
            <span className="text-gray-500 text-sm">  ({Math.floor(Math.random() * 100 + 1)} reviews)</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center">
              <FaUsers className="text-gray-500 mr-2" />
              <span>{passengers} Passengers</span>
            </div>
            <div className="flex items-center">
              <FaCar className="text-gray-500 mr-2" />
              <span>{transmission}</span>
            </div>
            {airConditioning && (
              <div className="flex items-center">
                <FaSnowflake className="text-gray-500 mr-2" />
                <span>Air Conditioning</span>
              </div>
            )}
            <div className="flex items-center">
              <FaDoorOpen className="text-gray-500 mr-2" />
              <span>{doors} Doors</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold text-xl">{price}MAD<span className="text-gray-500 text-sm">/day</span></p>
          </div>
          <Link
            to={`/rent/${_id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition"
          >
            Rent Now <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;