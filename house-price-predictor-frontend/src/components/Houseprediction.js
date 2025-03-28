import React, { useState } from 'react';
import '../styles/HousePrediction.css';

function HousePrediction() {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    latitude: '',
    longitude: '',
    lease_term: '',
    type: '',
    beds: '',
    baths: '',
    sq_feet: '',
    furnishing: '',
    smoking: '',
    pets: false
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/predict_house_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="house-prediction-container">
      <h1>House Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <div>
          <label>Lease Term:</label>
          <input
            type="text"
            name="lease_term"
            value={formData.lease_term}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type of House:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Number of Beds:</label>
          <input
            type="number"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Number of Baths:</label>
          <input
            type="number"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            step="0.5"
            required
          />
        </div>

        <div>
          <label>Square Feet:</label>
          <input
            type="number"
            name="sq_feet"
            value={formData.sq_feet}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Furnishing:</label>
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>

        <div>
          <label>Smoking:</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>I have a pet:</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="pets"
              checked={formData.pets}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Predict</button>
      </form>

      {predictedPrice && (
        <div className="prediction-result">
          Predicted Rent Price: ${predictedPrice}
        </div>
      )}
    </div>
  );
}

export default HousePrediction;

