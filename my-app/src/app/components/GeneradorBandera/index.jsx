"use client";
import { useEffect, useState } from 'react';
import styles from './GeneradorBandera.module.css';
import '../styles/globals.css';

export default function GeneradorBandera() {
  const [paises, setPaises] = useState([]);
  const [bandera, setBandera] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const data = await response.json();
        setPaises(data.data);
        setRandomFlag(data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchPaises();
  }, []);

  const setRandomFlag = (data) => {
    const randomPais = data[Math.floor(Math.random() * data.length)];
    setBandera(randomPais);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.toLowerCase() === bandera.name.toLowerCase()) {
      setMessage('Correcto!');
    } else {
      setMessage('Incorrecto. Intenta de nuevo.');
    }
    setRandomFlag(paises);
    setInput('');
  };

  if (!bandera) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>{bandera.name}</h2>
      <img src={bandera.flag} alt={`Bandera de ${bandera.name}`} width="100" height="60" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingrese el nombre del país"
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
