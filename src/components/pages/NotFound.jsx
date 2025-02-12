import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-[#1a73e8] hover:text-[#1557b0] font-medium">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
