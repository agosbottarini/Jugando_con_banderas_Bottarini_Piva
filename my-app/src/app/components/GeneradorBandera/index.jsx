"use client";
import { useState, useEffect } from 'react';

const GeneradorBandera = (props) => 
{
    console.log(props)
    return(
        <ul>
        {props.map((pais) => (
          <li key={pais.name}>

            <img src={pais.flag} alt={`Bandera de ${pais.name}`} width="500vw" height="250vw" />

          </li>
        ))}
      </ul>
    )
}

export default GeneradorBandera;