import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {Link} from "react-router-dom"

function PokemonCard({ url, name }) {
  const [pokedata, setPokedata] = useState()
  
  useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => {setPokedata(data)})
  }, [])

  if (pokedata){
  return (
    <Card style={{ 
      width: '14rem',
      margin: "1rem"}}>
        <Link to={name}>
      <Card.Title>{pokedata.name}</Card.Title>
      </Link>
      <Card.Img src={pokedata.sprites.front_default} />
      <Card.Body>
        <ul>
          {pokedata.abilities.map(ability => {
              return <li>{ability.ability.name}</li> 
            })
          }
        </ul>
      </Card.Body>
    </Card>
  );
 }
}

export { PokemonCard };
