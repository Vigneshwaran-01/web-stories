// ReturnJourney.js
import React from 'react';

const ReturnJourney = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 mt-6 border-t border-gray-500 pt-4">
      <h3 className="text-lg font-semibold">Return Journey Details</h3>
      <input
        type="text"
        name="returnPickUpAddress"
        value={formData.returnPickUpAddress}
        onChange={handleChange}
        className="w-full p-2 border text-black border-gray-300 rounded-md"
        placeholder="Return Pick Up Address"
      />
      <input
        type="text"
        name="returnDropOffAddress"
        value={formData.returnDropOffAddress}
        onChange={handleChange}
        className="w-full p-2 border text-black border-gray-300 rounded-md"
        placeholder="Return Drop Off Address"
      />
      <div>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
          className="w-full p-2 border text-black border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default ReturnJourney;
