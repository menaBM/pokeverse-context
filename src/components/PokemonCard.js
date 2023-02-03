import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
import { FavouritesContext } from '../routes/FavouritesProvider';

function PokemonCard({ url, name }) {

  const [pokedata, setPokedata] = useState()
  const {favourites, addFavourites, removeFavourites} = useContext(FavouritesContext)

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

          {favourites.includes(name)?(
            <Button variant="danger" onClick={() => removeFavourites(name)}>remove from favourites</Button>
          ):
          (
            <Button variant="primary" onClick={() => addFavourites(name)}>add to favourites</Button>
          )}

      </Card.Body>
    </Card>
  );
 }
}

export { PokemonCard };
