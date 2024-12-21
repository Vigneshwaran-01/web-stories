"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Confirm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      setFormData(JSON.parse(decodeURIComponent(data))); 
    }
  }, [searchParams]);

  const vehicles = [
    { name: "Saloon", price: "£37.87", capacity: 3, imgSrc: "/img1.jpg" },
    { name: "Estate", price: "£40.25", capacity: 4, imgSrc: "/img2.jpg" },
    { name: "MPV5", price: "£42.63", capacity: 4, imgSrc: "/img3.jpg" },
    { name: "MPV6", price: "£45.01", capacity: 6, imgSrc: "/img4.jpg" },
    { name: "MPV7", price: "£47.39", capacity: 6, imgSrc: "/img1.jpg" },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6 space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Section*/}
      
      <div 
      className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-4"
      onClick={}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Vehicle</h2>
        <div className="space-y-4">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex items-start space-x-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={vehicle.imgSrc}
                alt={vehicle.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-md font-semibold text-gray-800">{vehicle.name}</h3>
                <p className="text-sm text-gray-600">{vehicle.price}</p>
                <p className="text-sm text-gray-500">Capacity: {vehicle.capacity}</p>
                <a href="#" className="text-blue-500 text-sm underline mt-2 block">
                  Click here to visit the gallery page
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Trip Details Form */}
      <div className="w-full md:w-1/2 bg-black  shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Trip Details</h2>
        <div className="space-y-4">
          {/* Journey Details */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="text-md font-semibold text-gray-700">Journey</h3>
            <p className="text-sm text-gray-600">Service Type: Distance</p>
            <p className="text-sm text-gray-600">
              From: {formData.pickUpAddress}
            </p>
            <p className="text-sm text-gray-600">
              To: {formData.dropOffAddress}
            </p>
            <p className="text-sm text-gray-600">Date:{formData.date}</p>
            <p className="text-sm text-gray-600">Time: {formData.pickUpHour}:{formData.pickUpMinute}</p>
            {/* <p className="text-sm text-gray-600">Distance: 11.91 miles (43 mins)</p> */}
            <p className="text-sm text-gray-600">Journey Type: {formData.tripType}</p>
          </div>

          {/* Form Fields */}
          <form className="space-y-4 ">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-200">
                  Number of Passengers *
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-200">
                  Number of Bags *
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Pick Up Instructions
              </label>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Drop Off Instructions
              </label>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="2"
              ></textarea>
            </div>

            {/* Personal Details */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-200">
                  First Name *
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-200">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Email Address *
              </label>
              <input
                type="email"
                className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Phone Number *
              </label>
              <input
                type="tel"
                className="mt-1 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
