import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
  </div>
);

export default LoadingSpinner; 