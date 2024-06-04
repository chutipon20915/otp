// import React, { useState } from 'react';

// const About = () => {
//   const [formData, setFormData] = useState({
//     otp: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form data submitted:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="otp">Please Enter OTP:</label>
//         <input
//           type="otp"
//           id="otp"
//           name="otp"
//           value={formData.otp}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default About;

import React, { useState } from 'react';
import axios from 'axios';

const About = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify', { email, otp });
      setMessage('OTP verified! Welcome to the next page.');
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };

  return (
    <div>
      <h1>Please Enter OTP Verification</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default About;

