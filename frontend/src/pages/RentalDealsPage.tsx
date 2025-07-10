import React, { useState, useEffect } from 'react';
import {
  FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen, 
  FaFilter, FaSearch, FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCars, Car } from '../context/CarContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface CarCardProps extends Car {
  _id: string;
}

const CarCard: React.FC<CarCardProps> = ({
  _id,
  name,
  images,
  reviewCount,
  passengers,
  transmission,
  airConditioning,
  doors,
  price,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
      <div className="w-full md:w-1/3 h-48 md:h-auto">
        <img 
          src={images[0]} 
          alt={name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="flex items-center mb-3">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm">
              <FaUsers className="text-gray-500 mr-2" />
              <span>{passengers} Passengers</span>
            </div>
            <div className="flex items-center text-sm">
              <FaCar className="text-gray-500 mr-2" />
              <span>{transmission}</span>
            </div>
            <div className="flex items-center text-sm">
              <FaSnowflake className="text-gray-500 mr-2" />
              <span>{airConditioning ? 'AC' : 'No AC'}</span>
            </div>
            <div className="flex items-center text-sm">
              <FaDoorOpen className="text-gray-500 mr-2" />
              <span>{doors} Doors</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-sm text-gray-500">Price per day</p>
            <p className="font-bold text-xl">{formatPrice(price)}</p>
          </div>
          <Link
            to={`/rent/${_id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded flex items-center hover:bg-blue-700 transition w-full sm:w-auto justify-center"
          >
            Rent Now <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RentalDealsPage: React.FC = () => {
  const { cars, loading, error, fetchCars } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('price-low');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Get unique categories from cars
  const allCategories = ['All', ...new Set(cars.map(car => car.category))];

  // Calculate max price when cars are loaded
  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      const maxCarPrice = Math.max(...cars.map(car => car.price));
      setPriceRange([0, Math.ceil(maxCarPrice)]);
    }
  }, [cars]);

  // Update active filters display
  useEffect(() => {
    const filters = [];
    if (searchTerm) filters.push(`Search: "${searchTerm}"`);
    if (selectedCategory && selectedCategory !== 'All') filters.push(`Category: ${selectedCategory}`);
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      filters.push(`Price: ${priceRange[0]}DH - ${priceRange[1]}DH`);
    }
    setActiveFilters(filters);
  }, [searchTerm, selectedCategory, priceRange]);

  // Filter and sort cars
  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.price - b.price;
      }
    });

  const maxPrice = cars.length > 0 
    ? Math.ceil(Math.max(...cars.map(car => car.price)))
    : 1000;

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > priceRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < priceRange[0]) {
      newRange[0] = value;
    }
    
    setPriceRange(newRange);
  };

  const clearFilter = (filterType: string) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('');
        break;
      case 'category':
        setSelectedCategory('All');
        break;
      case 'price':
        setPriceRange([0, maxPrice]);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] h-screen flex flex-col items-center justify-center gap-6 py-12 px-4">
        <LoadingSpinner />
        <h3 className="text-xl font-semibold text-gray-800">
          Finding the best cars for you...
        </h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-red-50 py-3 px-4 rounded-lg text-center mb-6">
          <span className="text-red-500">Error: {error}</span>
        </div>
        <button 
          onClick={fetchCars}
          disabled={loading}
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Loading...' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Rental Deals</h1>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {filter}
              <button 
                onClick={() => {
                  if (filter.includes('Search')) clearFilter('search');
                  else if (filter.includes('Category')) clearFilter('category');
                  else if (filter.includes('Price')) clearFilter('price');
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <FaTimes size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaFilter className="mr-2" /> Filters
            </h2>

            {/* Search Filter */}
            <div className="mb-6">
              <label className=" font-medium mb-2 flex items-center">
                <FaSearch className="mr-2 text-gray-500" /> Search
              </label>
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex justify-between mb-2">
                <span>{priceRange[0]}DH</span>
                <span>{priceRange[1]}DH</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Min</label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Max</label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, maxPrice]);
                setSelectedCategory('All');
              }}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Cars List */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard key={car._id} {...car} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-2">No cars found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any cars matching your criteria. Try adjusting your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange([0, maxPrice]);
                      setSelectedCategory('All');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDealsPage;