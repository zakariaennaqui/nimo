import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface CarSpecs {
  passengers?: number;
  luggage?: number;
  range?: string;
  fuelType?: string;
}

export interface AvailableDate {
  start: Date;
  end: Date;
}

export interface Car {
  _id: string;
  name: string;
  images: string[];
  type: string;
  location: string;
  reviewCount?: number;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
  category: string;
  description: string;
  features: string[];
  specs: CarSpecs;
  rating: number;
  owner: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  isAvailable: boolean;
  availableDates: AvailableDate[];
  createdAt: string;
  updatedAt: string;
}

// Define the context type
interface CarContextType {
  cars: Car[];
  popularCars: Car[];
  userCars: Car[];
  loading: boolean;
  error: string | null;
  fetchCars: (filters?: Record<string, any>) => Promise<void>;
  fetchUserCars: () => Promise<void>;
  getCar: (id: string) => Promise<Car | null>;
  addCar: (carData: FormData) => Promise<Car | null>;
  updateCar: (id: string, carData: FormData) => Promise<Car | null>;
  deleteCar: (id: string) => Promise<boolean>;
  updateCarAvailability: (id: string, data: { isAvailable?: boolean, startDate?: string, endDate?: string }) => Promise<Car | null>;
}

// Create context with default values
const CarContext = createContext<CarContextType>({
  cars: [],
  popularCars: [],
  userCars: [],
  loading: false,
  error: null,
  fetchCars: async () => {},
  fetchUserCars: async () => {},
  getCar: async () => null,
  addCar: async () => null,
  updateCar: async () => null,
  deleteCar: async () => false,
  updateCarAvailability: async () => null,
});

// Create provider component
interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const carCache: Record<string, Car> = {};
  // Fetch cars from API with optional filters
  const fetchCars = async (filters?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/cars';
      
      // Add query params if filters exist
      if (filters && Object.keys(filters).length > 0) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });
        url += `?${queryParams.toString()}`;
      }
      
      const response = await axios.get(url);
      
      if (response.data.success) {
        setCars(response.data.data);
        
        // Sort by review count to get popular cars
        const sortedByPopularity = [...response.data.data]
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        setPopularCars(sortedByPopularity.slice(0, 4));
      } else {
        setError('Failed to fetch cars');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's cars
  const fetchUserCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/cars/user/mycars');
      console.log("API Response:", response.data); // Debug log
      
      if (response.data.success) {
        // Make sure we're setting the actual data array
        setUserCars(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to fetch your cars');
        toast.error(response.data.message || "Failed to fetch your cars");
        setUserCars([]); // Reset to empty array on failure
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch your cars';
      setError(errorMessage);
      console.error('Error fetching user cars:', err);
      setUserCars([]); // Reset to empty array on error
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  
  // Get a single car by ID
  const getCar = async (id: string): Promise<Car | null> => {
    // Check cache first
    if (carCache[id]) {
      return carCache[id];
    }
  
    setLoading(true);
    setError(null);
    const cleanId = id.trim();
    console.log("Fetching car with ID:", cleanId); // Debug log

    try {
    
      const response = await axios.get(`/api/cars/${cleanId}`);
      
      if (response.data?.success) {
        // Cache the result
        carCache[id] = response.data.data;
        return response.data.data;
      } else {
        setError(response.data?.message || "Car not found");
        return null;
      }
    } catch (err: any) {
      console.error("Error fetching car:", {
        message: err.message,
        response: err.response?.data,
      });
      setError(err.response?.data?.message || err.message || "Failed to fetch car");
      return null;
    } finally {
      setLoading(false);
    }
  };
  // Add a new car
  const addCar = async (carData: FormData): Promise<Car | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/cars', carData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Refresh user cars after adding a new one
        await fetchUserCars();
        toast.success('Car added successfully');
        return response.data.data;
      } else {
        setError('Failed to add car');
        toast.error('Failed to add car');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add car');
      console.error('Error adding car:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a car
  const updateCar = async (id: string, carData: FormData): Promise<Car | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/cars/${id}`, carData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Refresh user cars after updating
        await fetchUserCars();
        return response.data.data;
      } else {
        setError('Failed to update car');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update car');
      console.error('Error updating car:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a car
  const deleteCar = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`/api/cars/${id}`);
      
      if (response.data.success) {
        // Refresh user cars after deletion
        await fetchUserCars();
        return true;
      } else {
        setError('Failed to delete car');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete car');
      console.error('Error deleting car:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update car availability
  const updateCarAvailability = async (
    id: string, 
    data: { isAvailable?: boolean, startDate?: string, endDate?: string }
  ): Promise<Car | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/cars/${id}/availability`, data);
      
      if (response.data.success) {
        // Refresh user cars after updating availability
        await fetchUserCars();
        return response.data.data;
      } else {
        setError('Failed to update car availability');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update car availability');
      console.error('Error updating car availability:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  const value = {
    cars,
    popularCars,
    userCars,
    loading,
    error,
    fetchCars,
    fetchUserCars,
    getCar,
    addCar,
    updateCar,
    deleteCar,
    updateCarAvailability,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

// Custom hook to use the car context
export const useCars = () => useContext(CarContext);