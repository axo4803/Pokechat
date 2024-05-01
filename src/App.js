import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from './pages/Home';
import {PokemonChat} from './pages/PokemonChat';
import {PokemonCard} from './components/PokemonCard';
import {POKE_CARD} from './AppConfig';
import React, {  useState } from 'react';

import './App.scss';
import 'semantic-ui-css/semantic.min.css'
import {  Input} from 'semantic-ui-react'



export default function App() {
  const [PokemonID,setPokemonID] = useState(POKE_CARD);
  const handleInputChange = (event) => {
    setPokemonID(event.target.value);
    };
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/card" element={ 
          
          <div className="CenteredTopLayout"> 
          <Input
                placeholder="Enter Pokémon ID"
                value={PokemonID }
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px' }}
          /> 
              <PokemonCard pokemonID={PokemonID} /> </div>} />
          <Route path="/chat" element={<PokemonChat />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
