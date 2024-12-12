import React from 'react';

const Shimmer = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 animate-pulse">
      <div className="flex justify-center mb-4">
        {/* Placeholder for the image */}
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
      </div>
      {/* Placeholder for the name */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
      {/* Placeholder for the symbol */}
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
      {/* Placeholder for the price */}
      <div className="h-5 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
      {/* Placeholder for the market cap */}
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
    </div>
  );
};

export default Shimmer;
