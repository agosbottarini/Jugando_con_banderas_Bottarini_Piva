"use client";
import { useEffect, useState } from 'react';
import styles from './GeneradorBandera.module.css';
import '../../styles/globals.css';

export default function GeneradorBandera() {
  const [paises, setPaises] = useState([]);
  const [bandera, setBandera] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const fetchPaises = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
      const data = await response.json();
      setPaises(data.data);
      setRandomFlag(data.data);
    };

    fetchPaises();
  }, []);

  const setRandomFlag = (data) => {
    const randomPais = data[Math.floor(Math.random() * data.length)];
    setBandera(randomPais);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === bandera.name.toLowerCase()) {
      setMessage('Correcto!');
      setPuntos(prevPuntos => prevPuntos + 10);
    } else {
      setMessage('Incorrecto. Intenta de nuevo.');
      setPuntos(prevPuntos => prevPuntos - 1);
    }
    setRandomFlag(paises);
    setInput('');
  };

  if (!bandera) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Adivina la Bandera</h2>
      <h2 className={styles.heading}>{bandera.name}</h2>
      <img className={styles.flagImage} src={bandera.flag} alt={`Bandera de ${bandera.name}`} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingrese el nombre del país"
        />
        <div className='enviar'>
          <button className={styles.button} type="submit">Enviar</button>
        </div>
        
      </form>
      {message && <p className={styles.message}>{message}</p>}
      {puntos !== null && <p className={styles.puntos}> Puntos: {puntos }</p>}
      <div>

      </div>
    </div>
    
  );
}
