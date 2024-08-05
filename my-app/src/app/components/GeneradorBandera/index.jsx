"use client";
import { useEffect, useState } from 'react';

export default function GeneradorBandera() {
  const [paises, setPaises] = useState([]);
  const [bandera, setBandera] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [puntos, setPuntos] = useState(null);

  useEffect(() => {
    const fetchPaises = async () => {

      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
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

  if (!bandera) return <p></p>;

  return (
    <div>

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
      {puntos && <p> Puntos: {puntos }</p>}

    </div>
  );
}
