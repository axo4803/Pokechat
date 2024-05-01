
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState(null); 
    //AXIOS GET ON THE POKEAPI PT 
    const chat = async (query)=>{
        const response = await axios.get(`${CHAT_API}/chat/query` , {params: {q : query}});
        console.log(response);
        const pokeArray = Array.isArray(response.data)? response.data.map(poke => poke.id): response.data.id;
        console.log(pokeArray);
        
        setSearchResults(pokeArray);
       
         
    }
    
    const handleInputChange = (event) => {
        const query = event.target.value;
        setQuery(query);
        
      };
    const handellabelClick = (lablename)=>{
        setQuery(lablename);
        setPlaceholder(lablename);
    }
    const handleIconClick = () => {
        chat(query);
        console.log(query);
        console.log("Icon clicked!");
      };


    return (
    <div className='chat'>
        <Input fluid 
        icon={<Icon name='send' inverted circular link onClick={handleIconClick}/>}
        placeholder={placeholder === null ? "Ask me a Pokemon Question..." : placeholder}
        onChange={ handleInputChange} 
        />
    
        <Label pointing='above' message="strongest pokemon" onClick={()=>handellabelClick("Strongest Pokemon")}> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon" onClick={()=>handellabelClick("Weakest Pokemon")}> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon" onClick={()=>handellabelClick("Starter Pokemon")}> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
