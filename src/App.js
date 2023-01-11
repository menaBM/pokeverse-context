import React, {useEffect, useState} from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard'; 
import InputGroup from "react-bootstrap/InputGroup"
import { FormControl, Container, Row } from 'react-bootstrap';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {

  const [pokemonList, setPokemonList] = useState([])
  const [pokemonListFiltered, setPokemonListFiltered] = useState([])

  useEffect(()=>{
    fetch(pokeApi)
    .then(response => response.json())
    .then(data => {
      setPokemonList(data.results)
      setPokemonListFiltered(data.results)
    })
    .catch((error) =>{ throw new Error(error)})
  }, [])

  function filterPokemon(e){
    const value = e.target.value
    const regex = new RegExp(value, "gi")
    const filtered = pokemonList.filter(pokemon => {
      return pokemon.name.match(regex)})
    setPokemonListFiltered(filtered)
  }

  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup className='mb-3' onChange={filterPokemon} style={{width:"60%", marginLeft:"auto", marginRight:"auto"}}>
        <FormControl placeholder='pokemon name' />
      </InputGroup>
      <Container style={{display:"flex", justifyContent:"space-between",  width:"80%"}}>
        <Row>
        {pokemonListFiltered.map(pokemon => (<PokemonCard key={pokemon.name} url={pokemon.url} name={pokemon.name} />))}
        </Row>
    </Container>
    </div>
  );
}

export { App };
