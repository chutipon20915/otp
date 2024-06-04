import React, { useState } from 'react';

const About = () => {
  const [formData, setFormData] = useState({
    otp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="otp">Please Enter OTP:</label>
        <input
          type="otp"
          id="otp"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default About;
