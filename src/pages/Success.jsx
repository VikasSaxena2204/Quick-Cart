import React from 'react';
import { MdDoneOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center gap-4">
        <MdDoneOutline className="text-green-600 text-5xl animate-bounce" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base max-w-lg">
          Thank you for shopping with us! Your order has been placed and is now being processed. You’ll receive a confirmation email shortly.
        </p>
        <Link
          to="/"
          className="mt-4 bg-blue-600 text-white text-sm md:text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
