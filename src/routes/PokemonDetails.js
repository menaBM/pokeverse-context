import { useParams } from "react-router-dom"
import {useEffect, useState} from "react"
import { Container, ListGroup, ListGroupItem } from "react-bootstrap"

export default function PokemonDetails(){
    const [pokemon, setPokemon] = useState(null)
    const { name } = useParams()
    
    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(data => data.json())
        .then(data => setPokemon(data))
    },[name])

    if (!pokemon) return <>loading...</>
    return (
        <Container>
            <h3>{pokemon.name}</h3>
            <img width="300" height="300" src={pokemon.sprites.front_default}/>
            <ListGroup variant="flush">
                <ListGroup.Item>height: {pokemon.height}</ListGroup.Item>
                <ListGroupItem>weight: {pokemon.weight}</ListGroupItem>
                <ListGroupItem>
                    <p>Abilities</p>
                    <ul>
                        {pokemon.abilities.map(ability => {
                        return <li>{ability.ability.name}</li> 
                        })}
                    </ul>
                </ListGroupItem>
                <ListGroupItem>Types:
                    <ul>
                        {pokemon.types.map((type)=>{
                            return <li>{type.type.name}</li>
                        })}
                    </ul>
                </ListGroupItem>
                <ListGroupItem>Stats:
                    <ul>
                        {pokemon.stats.map((stat)=>{
                            return <li>{stat.stat.name}: {stat.base_stat}</li>
                        })}
                    </ul>
                </ListGroupItem>
            </ListGroup>
        </Container>
    )
}