import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from './components/Navigation';
import { Favourites } from "./routes/Favourites";
import {FavouritesContext, FavouritesProvider } from './routes/FavouritesProvider';
import Home from "./routes/Home";
import PokemonDetails from "./routes/PokemonDetails";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

// export const FavouritesContext = createContext();

function App() {
  const [pokemonList, setPokemonList] = useState([])
  
  // const {favourites} = useContext(FavouritesContext)
  // function addFavourites(name){
  //     setFavourites([...favourites,name])
  //   }
  // function removeFavourites(name){
  //   setFavourites(favourites.filter(favourite =>{
  //     return name !=favourite
  //   })
  //   )}

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
      <FavouritesProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
              <Route path="/" element={<Home pokemonList={pokemonList}/>}></Route>
              <Route path="/:name" element={<PokemonDetails/>} />
              <Route path="/favourites" element={<Favourites pokemonList={pokemonList}/>} 
             />
          </Routes>
        </BrowserRouter>
      </FavouritesProvider>
      
    </div>
  );
}

export { App };