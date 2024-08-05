"use client";
import {useEffect, useState} from 'react';
import GeneradorBandera from '../components/GeneradorBandera';

export default function Juego()
{
    return(
        <div>
            <h1>Adivina la Bandera</h1>
            <GeneradorBandera/>
        </div>
    )
}
