import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/cars')
      .then((response) => setCars(response.data))
      .catch((error) => console.error('Chyba při načítání aut:', error));
  }, []);

  const handleCarClick = (id) => {
    navigate(`/cars/${id}`);
  };

  return (
    <div>
      <h1>Seznam aut</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card" onClick={() => handleCarClick(car.id)}>
            <img src={`/images/${car.image}`} alt={car.name} width="300" />
            <h2>{car.name}</h2>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
