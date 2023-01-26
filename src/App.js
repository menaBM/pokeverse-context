import React, {useEffect, useState} from 'react';
import { Navigation } from './components/Navigation';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PokemonDetails from "./routes/PokemonDetails"
import Home from "./routes/Home"

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(()=>{
    fetch(pokeApi)
    .then(response => response.json())
    .then(data => {
      setPokemonList(data.results)
    })
    .catch((error) =>{ throw new Error(error)})
  }, [])

  return (
    <div data-testid="app">
      <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="/" element={<Home pokemonList={pokemonList}/>}></Route>
            <Route path="/:name" element={<PokemonDetails/>} />
        </Routes>
      </BrowserRouter>
     
      
    </div>
  );
}

export { App };
