import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addReservation } from '../services/api';

function DetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/cars')
      .then((response) => {
        const selectedCar = response.data.find((car) => car.id === parseInt(id));
        setCar(selectedCar);
      })
      .catch((error) => console.error('Chyba při načítání auta:', error));
  }, [id]);

  const handleReservation = () => {
    const reservation = { fromDate, toDate };
    addReservation(id, reservation)
      .then((response) => {
        alert('Rezervace úspěšná');
        setCar(response.car);  // Aktualizace auta s rezervací
      })
      .catch(() => alert('Chyba při rezervaci'));
  };

  if (!car) return <p>Načítání...</p>;

  return (
    <div>
      <h1>{car.name}</h1>
      <img src={`/images/${car.image}`} alt={car.name} width="500" />
      <p>{car.description}</p>

      <h2>Rezervace</h2>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <button onClick={handleReservation}>Vytvořit rezervaci</button>

      <h3>Existující rezervace</h3>
      <ul>
        {car.reservations.map((res, index) => (
          <li key={index}>
            {res.fromDate} - {res.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailPage;
