import { PokemonCard } from '../components/PokemonCard'; 
import { FormControl, Container, Row } from 'react-bootstrap';
import InputGroup from "react-bootstrap/InputGroup"
import React, {useEffect, useState} from 'react';

export default function Home({pokemonList}){
    const [pokemonListFiltered, setPokemonListFiltered] = useState([])
    
    useEffect(()=>{
      setPokemonListFiltered(pokemonList)
    },[pokemonList])
    
    function filterPokemon(e){
        const value = e.target.value
        const regex = new RegExp(value, "gi")
        const filtered = pokemonList.filter(pokemon => {
          return pokemon.name.match(regex)})
        setPokemonListFiltered(filtered)
      }

    return (
        <>
        <InputGroup className='mb-3' onChange={filterPokemon} style={{width:"60%", marginLeft:"auto", marginRight:"auto"}}>
        <FormControl placeholder='pokemon name' />
        </InputGroup>
        <Container style={{display:"flex", justifyContent:"space-between",  width:"80%"}}>
        <Row>
        {pokemonListFiltered.map(pokemon => {
        return   <PokemonCard key={pokemon.name} url={pokemon.url} name={pokemon.name} />
}
)}
        </Row>
        </Container>
        </>
    )
}   
