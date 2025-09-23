import React from "react";

const LoadingSpinner = ({ header = "", description = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      {/* Loader */}
      <span className="loading loading-spinner loading-lg text-primary"></span>

      {/* Header */}
      {header && (
        <h2 className="text-lg font-semibold text-secondary text-center">
          {header}
        </h2>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
