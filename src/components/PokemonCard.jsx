import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';

/*
 Got this color correspondence chart online from https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
 Reference here for citation purposes 
*/
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};



const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [isHover,setisHover] = useState(false)
    
    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT 
        const getData = async() => {
            if (pokemonID !== '') {
               const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
            const response = await axios.get(endpoint);
            setData(response.data);
            }
            
        }
        getData();
    }, [pokemonID]);
    
const handleMouseHover = () => {
    setisHover(true)
};

const handleMouseLeave = () => {
    setisHover(false)
};



    return (

        
           <div>
              
            <Card>
            {data && (
             <Image onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
             {isHover ? (
                    <img src={data.sprites.front_shiny} alt={`${data.name} Shiny`} />
                ) : (
                    <img src={data.sprites.front_default} alt={`${data.name}`} />
                )}
         </Image>
         
            )}
            <Card.Content>

            <strong> { data && data.name} </strong>
            <Label.Group>
                {data && data.types.map((type, index) => (
                    <Label key={index} style={{ backgroundColor: colours[type.type.name.toLowerCase()] }} >  {type.type.name.toUpperCase()}  </Label>
                ))}
            </Label.Group>
           
            </Card.Content>
            <Card.Content>
            <List divided verticalAlign='middle'>
            {
            data && data.stats.map((stat,index) => (
                <List.Item key={index}>
                <List.Content floated="left">
                   <strong>{stat.stat.name}:</strong>
                </List.Content>
                <List.Content floated="right">
                <span><strong>{stat.base_stat}</strong>{" "}</span>
                </List.Content>
            </List.Item>
           ))}
        </List>
        </Card.Content>
    
        </Card>
        </div>
    );
    
}



export {PokemonCard};