import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaStar, FaUsers, FaCar, FaSnowflake, FaDoorOpen, FaMapMarkerAlt, 
  FaCheck, FaChevronLeft, FaPhone, FaEnvelope, FaCalendarAlt 
} from 'react-icons/fa';
import { useCars, Car } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const RentalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cars, loading: carsLoading, getCar } = useCars();
  
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      setError(null);
      
      if (!id) {
        setError('Invalid car ID');
        setLoading(false);
        return;
      }
      
      try {
        const cleanId = id.trim();
        const carData = await getCar(cleanId);
        console.log("====>carData" , carData)
        
        if (carData) {
          setCar(carData);
        } else {
          const foundCar = cars.find(c => c._id === cleanId);
          setCar(foundCar || null);
          if (!foundCar) setError('Car not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch car details');
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!carsLoading && id) {
      fetchCarData();
    }
  }, [id]);

  const calculateTotal = () => {
    if (!car || !startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.price;
  };

  const isDateAvailable = (date: Date) => {
    if (!car?.availableDates || car.availableDates.length === 0) return true;
    return car.availableDates.some(avail => {
      const availStart = new Date(avail.start);
      const availEnd = new Date(avail.end);
      return date >= availStart && date <= availEnd;
    });
  };

  const handleBookingSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to book a car');
      navigate('/signin');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select valid dates');
      return;
    }

    if (!isDateAvailable(startDate) ){
      toast.error('Selected start date is not available');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(
        <div>
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Successfully booked {car?.name}!</span>
          </div>
          <p className="text-sm mt-1">Confirmation sent to your email</p>
        </div>
      );
      
      setShowBookingModal(false);
      // navigate('/my-bookings');
      navigate("/");
    } catch (err) {
      toast.error('Failed to complete booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactOwner = () => {
    if (!user) {
      toast.error('Please sign in to contact the owner');
      navigate('/signin');
      return;
    }
    
    if (car?.owner?.email) {
      window.location.href = `mailto:${car.owner.email}`;
    }
  };

  if (loading || carsLoading) {
    return (
      <div className="container mx-auto py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 py-3 px-4 rounded-lg text-center mb-6">
          <span className="text-red-500">Error: {error || 'Car not found'}</span>
        </div>
        <div className="text-center">
          <Link 
            to="/rental" 
            className="inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaChevronLeft className="mr-1" /> Back to all cars
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/rental" className="hover:text-blue-500">Rental</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{car.name}</span>
      </div>

      {/* Car Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="md:w-2/3">
            <div className="h-96 bg-white relative">
              {car.images?.length > 0 ? (
                <img 
                  src={car.images[selectedImage]} 
                  alt={car.name} 
                  className="w-full h-auto scale-75 text-center object-contain transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {car.images?.length > 1 && (
              <div className="flex p-4 gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-blue-500 scale-105' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${car.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Car Info */}
          <div className="md:w-1/3 p-6 border-l">
            <h1 className="text-2xl font-bold mb-2">{car.name}</h1>
            
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-bold mr-1">4.8</span>
              <span className="text-gray-500 text-sm">({car.reviewCount || 0} reviews)</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{car.location || 'Location not specified'}</span>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <p className="text-gray-500 text-sm mb-1">Price per day</p>
              <p className="text-3xl font-bold">{car.price} MAD</p>
            </div>
            
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-blue-600 text-white w-full py-3 rounded-md text-center block font-medium hover:bg-blue-700 transition mb-4"
            >
              Book Now
            </button>
            
            <button 
              onClick={handleContactOwner}
              className="border border-gray-300 w-full py-3 rounded-md text-center  font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FaPhone /> Contact Owner
            </button>
          </div>
        </div>
      </div>
      
      {/* Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Car Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCar className="mr-2 text-blue-500" /> Car Details
          </h2>
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center">
              <FaUsers className="text-gray-500 mr-2" />
              <span>{car.passengers} Passengers</span>
            </div>
            <div className="flex items-center">
              <FaCar className="text-gray-500 mr-2" />
              <span>{car.transmission}</span>
            </div>
            {car.airConditioning && (
              <div className="flex items-center">
                <FaSnowflake className="text-gray-500 mr-2" />
                <span>Air Conditioning</span>
              </div>
            )}
            <div className="flex items-center">
              <FaDoorOpen className="text-gray-500 mr-2" />
              <span>{car.doors} Doors</span>
            </div>
            {car.type && (
              <div className="flex items-center">
                <FaCheck className="text-gray-500 mr-2" />
                <span>{car.type}</span>
              </div>
            )}
            {car.category && (
              <div className="flex items-center">
                <FaCheck className="text-gray-500 mr-2" />
                <span>{car.category}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCheck className="mr-2 text-blue-500" /> Specifications
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers</span>
              <span className="font-medium">{car.specs?.passengers || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Luggage</span>
              <span className="font-medium">{car.specs?.luggage || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Range</span>
              <span className="font-medium">{car.specs?.range || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">{car.specs?.fuelType || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCheck className="mr-2 text-blue-500" /> Features
          </h2>
          <ul className="grid grid-cols-1 gap-y-2">
            {car.features?.length > 0 ? (
              car.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No features listed</li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Description */}
      {car.description && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
        </div>
      )}
      
      {/* Owner Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">About the Owner</h2>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            {car.owner?.profileImage ? (
              <img 
                src={car.owner.profileImage} 
                alt={car.owner.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                {car.owner?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{car.owner?.name || 'Unknown Owner'}</h3>
            {car.owner?.email && (
              <a 
                href={`mailto:${car.owner.email}`} 
                className="text-gray-600 hover:text-blue-500 flex items-center mt-1"
              >
                <FaEnvelope className="mr-2" /> {car.owner.email}
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Availability Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" /> Availability
        </h2>
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {car.isAvailable ? 'Currently Available' : 'Currently Not Available'}
          </span>
        </div>
        
        {car.availableDates?.length > 0 ? (
          <div>
            <h3 className="font-medium mb-2">Available Dates:</h3>
            <ul className="space-y-2">
              {car.availableDates.map((date, index) => (
                <li key={index} className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span>
                    {formatDate(new Date(date.start))} to {formatDate(new Date(date.end))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No specific availability dates provided</p>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Book {car.name}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rental Period</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    filterDate={isDateAvailable}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate || new Date()}
                    filterDate={isDateAvailable}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span>Daily Rate:</span>
                <span>${car.price}/day</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Rental Days:</span>
                <span>
                  {startDate && endDate ? 
                    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 
                    0} days
                </span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalDetailsPage;