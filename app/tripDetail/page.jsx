"use client"
import { useState } from 'react';
import { tickPoints } from '../data/data';
import { TiTick } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';


const TripDetails = () => {

  const router=useRouter()  ;
  const [isReturn, setIsReturn] = useState(false);
  const [formData, setFormData] = useState({
    pickUpAddress: '',
    dropOffAddress: '',
    tripType: 'One Way',
    date: '',
    returnDate: '',
    pickUpHour: '', 
    pickUpMinute: '',
    pickUpAMPM: 'AM', 
    returnPickUpAddress: '',
    returnDropOffAddress: '',
    returnHour: '',
    returnMinute: '',
    returnAMPM: 'AM', 
  });

 const validateForm=()=>{
  const {pickUpAddress,dropOffAddress,date,pickUpHour,pickUpMinute}=formData
  if(!pickUpAddress|| !dropOffAddress || !date || !pickUpHour|| !pickUpMinute ){
    alert("please fill all the details ")
     return false;
  }

  if(isReturn){
     const{returnPickUpAddress,returnDropOffAddress,returnDate,returnHour,returnMinute}=formData
     if(!returnPickUpAddress || !returnDropOffAddress || !returnDate || !returnHour || !returnMinute){
       alert("please fill the return details")
       return false;
     }
  }
  return true;
 }

 

  const handleTripTypeChange = (event) => {
    const newTripType = event.target.value;
    setIsReturn(newTripType === 'Return');
    setFormData({
      ...formData,
      tripType: newTripType,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!validateForm()){
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/api/submit-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
     
      alert(result.message); 
     

      const encodedData = encodeURIComponent(JSON.stringify(result.data));

      
      router.push(`/confirm?data=${encodedData}`);
    } catch (error) {
      console.error('Error sending trip details:', error);
      alert('An error occurred while submitting the trip details.');
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left section */}
        <div id="left" className="flex-1 space-y-4 py-4 px-8 bg-black text-white rounded-lg">
          <form className="space-y-4 px-2 py-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="pickUpAddress"
                value={formData.pickUpAddress}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Pick Up Address"
              />
              <input
                type="text"
                name="dropOffAddress"
                value={formData.dropOffAddress}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                placeholder="Drop Off Address"
              />
            </div>
            <div className="text-sm my-2 font-semibold flex justify-end">
              <button
                type="button"
                className="bg-slate-600 space-x-2 py-2 px-4 rounded-full"
              >
                <span className="text-red-400 font-semibold text-lg">+</span>
                <span>Add Via Point</span>
              </button>
            </div>
            <div>
              <select
                name="tripType"
                value={formData.tripType}
                onChange={handleTripTypeChange}
                className="w-full p-2 mt-2 border text-black border-gray-300 rounded-md"
              >
                <option value="One Way">One Way</option>
                <option value="Return">Return</option>
              </select>
            </div>

            <div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border text-black border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-around items-center gap-2">
              <h3 className="font-semibold">Pick Up Time</h3>
              <div className="flex flex-1 gap-2">
              <input
                  type="number"
                  name="pickUpHour"
                  value={formData.pickUpHour}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md"
                  placeholder="Hour"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  name="pickUpMinute"
                  value={formData.pickUpMinute}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md"
                  placeholder="Minute"
                  min="0"
                  max="59"
                />
              </div>
              <select
                name="pickUpAMPM"
                value={formData.pickUpAMPM}
                onChange={handleChange}
                className="p-2 border text-black border-gray-300 rounded-md"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {isReturn && (
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
                <div className="flex flex-col md:flex-row justify-around items-center gap-2">
              <h3 className="font-semibold">Pick Up Time</h3>
              <div className="flex flex-1 gap-2">
              <input
                  type="number"
                  name="returnHour"
                  value={formData.returnHour}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md"
                  placeholder="Hour"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  name="returnMinute"
                  value={formData.returnMinute}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md"
                  placeholder="Minute"
                  min="0"
                  max="59"
                />
              </div>
              <select
                name="returnAMPM"
                value={formData.returnAMPM}
                onChange={handleChange}
                className="p-2 border text-black border-gray-300 rounded-md"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full md:w-1/2 flex gap-2 justify-center items-center p-3 rounded-full bg-blue-500 text-white text-sm md:text-base hover:bg-blue-600 focus:outline-none transition-all"
            >
              Reserve Now
              <IoIosArrowForward className="text-lg" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className='border flex-1 px-4 py-6 rounded-md md:w-1/3' >
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Online Reservations</h2>
            <p className="mt-2 text-sm text-gray-600">
              Nullam erat felis, pellentesque non egestas nec, vulputate id odio. Donec mattis nec orci ut porta. Donec pharetra convallis augue in tincidunt. Nullam eget felis urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent tincidunt massa porta odio euismod, sit amet cursus quam sagittis.
            </p>
          </div>
        <div className="px-6 py-4 border-t border-gray-300 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickPoints.map((point, index) => (
          <div key={index} className="flex items-center space-x-2">
           <TiTick />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
    </div>
  );
};

export default TripDetails;
