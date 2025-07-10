import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';

const AddCarPage: React.FC = () => {
  const { addCar, loading, error: contextError } = useCars();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    price: '',
    passengers: '4',
    transmission: 'Automatic',
    airConditioning: false,
    doors: '4',
    category: '',
    description: '',
    luggage: '2',
    range: '',
    fuelType: 'Gasoline',
    features: [] as string[]
  });

  // Feature input state
  const [featureInput, setFeatureInput] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handle feature input change
  const handleFeatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureInput(e.target.value);
  };

  // Add feature
  const handleAddFeature = () => {
    if (featureInput.trim() !== '') {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  // Remove feature
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
      
      // Create preview URLs
      const newImagePreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls((prevUrls) => [...prevUrls, ...newImagePreviewUrls]);
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(updatedPreviewUrls[index]); // Clean up URL object
    updatedPreviewUrls.splice(index, 1);
    setImagePreviewUrls(updatedPreviewUrls);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate image upload
      if (images.length === 0) {
        throw new Error('Please upload at least one image');
      }

      // Create form data with all car information and images
      const carFormData = new FormData();
      
      // Add all basic car fields
      carFormData.append('name', formData.name);
      carFormData.append('type', formData.type);
      carFormData.append('location', formData.location);
      carFormData.append('price', formData.price);
      carFormData.append('passengers', formData.passengers);
      carFormData.append('transmission', formData.transmission);
      carFormData.append('airConditioning', formData.airConditioning ? 'true' : 'false');
      carFormData.append('doors', formData.doors);
      carFormData.append('category', formData.category);
      carFormData.append('description', formData.description);
      
      // Add features as separate fields with the same name
      formData.features.forEach(feature => {
        carFormData.append('features', feature);
      });
      
      // Add specs as separate fields
      carFormData.append('specs[passengers]', formData.passengers);
      carFormData.append('specs[luggage]', formData.luggage);
      carFormData.append('specs[range]', formData.range);
      carFormData.append('specs[fuelType]', formData.fuelType);
      
      // Add all images
      images.forEach(image => {
        carFormData.append('images', image);
      });
      
      // Submit car data using the context
      const result = await addCar(carFormData);
      
      if (result) {
        // Redirect to car listing or dashboard
        navigate('/rental-deals');
      } else {
        throw new Error(contextError || 'Failed to add car');
      }
    } catch (err: any) {
      console.error('Error adding car:', err);
      setError(err.message || 'Failed to add car. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Add Your Vehicle</h1>
      
      {(error || contextError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || contextError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Images */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Car Images</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload}
            />
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Upload Car Images</p>
              <p className="text-xs text-gray-500">Click to browse or drag and drop</p>
            </div>
          </div>

          {/* Image Previews */}
          {imagePreviewUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Car preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Car Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Honda Civic 2023"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Car Type*</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Convertible">Convertible</option>
              <option value="Sports">Sports</option>
              <option value="Luxury">Luxury</option>
              <option value="Coupe">Coupe</option>
              <option value="Minivan">Minivan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. New York, NY"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Day (DH)*</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        {/* Car Details */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-4">Car Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passenger Capacity</label>
              <input
                type="number"
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label htmlFor="doors" className="block text-sm font-medium text-gray-700">Number of Doors</label>
              <input
                type="number"
                id="doors"
                name="doors"
                value={formData.doors}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Category</option>
                <option value="Economy">Economy</option>
                <option value="Compact">Compact</option>
                <option value="Mid-size">Mid-size</option>
                <option value="Full-size">Full-size</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
                <option value="Special">Special</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="luggage" className="block text-sm font-medium text-gray-700">Luggage Capacity</label>
              <input
                type="number"
                id="luggage"
                name="luggage"
                value={formData.luggage}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="range" className="block text-sm font-medium text-gray-700">Range/Mileage</label>
            <input
              type="text"
              id="range"
              name="range"
              placeholder="e.g. 350 miles"
              value={formData.range}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="airConditioning"
              name="airConditioning"
              checked={formData.airConditioning}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="airConditioning" className="ml-2 block text-sm text-gray-700">
              Air Conditioning
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description*</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe your car, its condition, and any special features..."
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>

        {/* Special Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
          <div className="flex">
            <input
              type="text"
              placeholder="e.g. Bluetooth, GPS, Sunroof"
              value={featureInput}
              onChange={handleFeatureInputChange}
              className="flex-1 border border-gray-300 rounded-l-md shadow-sm p-2"
            />
            <button 
              type="button" 
              onClick={handleAddFeature}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
            >
              Add
            </button>
          </div>

          {/* Feature tags */}
          {formData.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding the car...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarPage;