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
  const [tiempoRestante, setTiempoRestante] = useState(15)
  const [letras, setLetras] = useState('')
  const [botonPista, setBotonPista] = useState(true)

  useEffect(() => {
    const fetchPaises = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
      const data = await response.json();
      setPaises(data.data);
      setRandomFlag(data.data);
    };

    fetchPaises();
  }, []);

  useEffect(() =>
  {
    if(tiempoRestante === 0)
    {
      setPuntos(prevPuntos => prevPuntos - 5);
      setRandomFlag(paises);
      setInput('')
      setTiempoRestante(15);
    }

    const timer = setInterval(() => 
    {
      setTiempoRestante(prevTiempo => prevTiempo > 0 ? prevTiempo - 1 : 0);
    }, 1000)

    return () => clearInterval(timer);
  }, [tiempoRestante, paises])

  const setRandomFlag = (data) => {
    const randomPais = data[Math.floor(Math.random() * data.length)];
    setBandera(randomPais);
    setTiempoRestante(15)
    setLetras('')
    setBotonPista(true);
  };

  const mostrarLetrasAzar = () => {
    const nameArray = bandera.name.split('');
    let letrasSeleccionadas = '';
    let posicionesSeleccionadas = new Set();

    while (letrasSeleccionadas.length < 3 && posicionesSeleccionadas.size < nameArray.length) {
      const index = Math.floor(Math.random() * nameArray.length);
      if (!posicionesSeleccionadas.has(index)) {
        letrasSeleccionadas += nameArray[index];
        posicionesSeleccionadas.add(index);
      }
    }

    let resultado = nameArray.map((letra, index) => posicionesSeleccionadas.has(index) ? letra : '-').join('');
    setLetras(resultado);
    setTiempoRestante(prevTiempo => prevTiempo - 2);
    setBotonPista(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === bandera.name.toLowerCase()) {
      setMessage('Correcto!');
      setPuntos(prevPuntos => prevPuntos + 10 + tiempoRestante);
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
      <h2>{bandera.name}</h2>
      {letras && <h2>{letras}</h2>}
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
          {botonPista && <button className={styles.button} onClick={mostrarLetrasAzar}>Pista</button>}
        </div>
        
      </form>
      {message && <p className={styles.message}>{message}</p>}
      {puntos !== null && <p className={styles.puntos}> Puntos: {puntos }</p>}
      <div>


      <p className={styles.tiempo}>Tiempo restante: <strong>{tiempoRestante} </strong>segundos</p>

      </div>
    </div>
    
  );
}
