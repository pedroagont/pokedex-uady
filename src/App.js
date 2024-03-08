import { useState } from 'react'; 
import './App.css';

function App() {
  // esto es una variable normal
  // const pokemonListData = ['pikachu', 'bulbasaur']

   // esto es una variable de estado, useState recibe el valor inicial
  const [pokemonListData, setPokemonListData] = useState([])
  const [pokemonDisplayData, setPokemonDisplayData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // imagen animada para estado loading
  const pokeballGifImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs'

  // función para obtener lista de datos
  const getPokemonList = () => {
    setTimeout(() => {
      fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(data => setPokemonListData(data.results))
    })
  }

  // función para obtener un dato individual
  const getPokemonByName = (name) => {
    setLoading(true)
    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => setPokemonDisplayData(data))
        .then(() => setLoading(false))
    }, 1500)
  }

  // el return incluye lo que se va mostrar visualmente en el navegador
  return (
    <div className="pokedex">
        <img className="pokedex-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" />
        <div className="pokedex-display">
          <img src={loading || !pokemonDisplayData ? pokeballGifImg : pokemonDisplayData?.sprites.front_default } />
          <span>{loading || !pokemonDisplayData ? '' : pokemonDisplayData.name}</span>
        </div>
        <button className="pokedex-button" onClick={getPokemonList}>Catch them all!</button>
        <ul className="pokedex-info">
          {pokemonListData.map(pk => <li key={pk.name} onClick={() => getPokemonByName(pk.name)}>{pk.name}</li>)}
        </ul>
    </div>
  );
}

export default App;