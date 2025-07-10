import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 w-full h-screen">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-lg w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full max-w-md animate-pulse"></div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
      </div>

      {/* Car card skeletons - grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate multiple car card skeletons */}
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Car image skeleton */}
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            
            {/* Car details skeleton */}
            <div className="p-4">
              {/* Car name */}
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              
              {/* Car features */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
              
              {/* Price and button */}
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-28 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

// export default ;