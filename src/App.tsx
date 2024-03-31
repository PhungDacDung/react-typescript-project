import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { log } from 'console';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons{
    name:string;
    url:string
}

export interface Detail{
  id:number,
  isOpened:false,
}                     

const App = () => {

    const [pokemons,setPokemon] =  useState<Pokemon[]>([])
    const [nextUrl,setNextUrl] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(true);
    const [detail,setDetail] = useState<Detail>({
      id:0,
      isOpened:false,
    })
    useEffect( ()=>{
      const getPokemon =  async() => {
         const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
         setNextUrl(res.data.next);
          res.data.results.forEach(async(pokemon:Pokemons) => {
              const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);      
              setPokemon((p) => [...p,poke.data]); 
              setLoading(false); 
                                  
          });
      }
      getPokemon();
    },[]);

    const loadMore = async () =>{
      let res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      setLoading(true);

      res.data.results.forEach(async (pokemon:Pokemons)=>{
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`); 
          setPokemon((p) => [...p,poke.data]);
          setLoading(false);                     

      })

    }

  return (
    <div className="App">
        <div className="container">
          <header className="pokemon-header">
            Pokemon
          </header>

          <PokemonCollection pokemons ={pokemons} detail={detail} setDetail={setDetail}/>

          <div className="btn">
              <button className='' onClick={loadMore}> {loading ? "Loading..." : "Load More"} {" "} </button>
          </div>
        </div>
    </div>
  );
}

export default App;
