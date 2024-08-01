"use client";
import {useEffect, useState} from 'react';
import GeneradorBandera from '../components/GeneradorBandera';

export default function Juego()
{
    const [paises, setPaises] = useState([]);

    useEffect(() => {

        const fetchPaises = async () =>
        {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPaises(data.data)
        }

        fetchPaises();
    }, [])


    return(
        <div>
            <h1>Adivina la Bandera</h1>

            <GeneradorBandera
            props = {paises}
            />
        </div>
    )
}