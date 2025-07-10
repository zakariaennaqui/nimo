import { useState } from 'react';
import { FaMapMarkerAlt, FaCar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchHome = () => {
  const [location, setLocation] = useState('');
  const [carType, setCarType] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({ location, carType });
    // Add your search logic here
    // You can implement navigation logic here
    navigate("/rental-deals")
  };

  return (
    <div className="max-w-4xl mx-auto my-8 flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 p-6 bg-white rounded-lg shadow-lg">
            {/* Car Type Input */}
            <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
              <div className="text-blue-600 text-2xl">
                <FaCar />
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-gray-700 mb-1">Car</h2>
                <input 
                  type="search" 
                  name="car" 
                  id="car" 
                  placeholder="Find your car"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="w-full border-none text-gray-800 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
                  required
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 flex-1">
              <div className="text-blue-600 text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-gray-700 mb-1">City</h2>
                <input 
                  type="search" 
                  name="location" 
                  id="location" 
                  placeholder="Enter city or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none text-gray-800 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
                  required
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center mt-4 md:mt-0 md:ml-4">
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SearchHome;