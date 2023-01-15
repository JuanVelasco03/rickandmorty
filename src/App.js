import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getAllCharacters } from './getAllCharacters';
import { searchCharacter} from './getAllCharacters';
import {searchCharacterGender} from './getAllCharacters';
import { Circle } from 'react-bootstrap-icons';

function App() {
  const inputSearch = useRef(null);
  const inputSearchGender = useRef(null);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchGender, setSearchGender] = useState("");


  function ValidarStatus(props) {
    const status = props.status;
     if (status === "Alive"){
       return <span><Circle className='success' /></span>
     }else if (status === "unknown"){
       return  <span><Circle className='gray' /></span>
     }else{
       return  <span><Circle className='red' /></span>
     }
   }

  useEffect( () => {
    getAllCharacters(page).then(setCharacters);

  }, [page]);



  const onChangePage = (next) => {

    if(!characters.previous && page + next <= 0) return;
    if(!characters.next && page + next >= 43) return;

    setPage(page + next) ;
  }


  const onChangeSearch = (event) =>{
 const text = inputSearch.current.value;
 setSearch(text)
 console.log( inputSearch.current.value);
  }

  const onSearchSubmit = (event) => {
    if (event.key !== "Enter") return;

    inputSearch.current.value = "";
    searchCharacter(search).then(setCharacters);
  }

  const handleClick = (event) => {
    searchCharacter(search).then(setCharacters);
    inputSearch.current.value = "";
  }



  const onChangeSearchGender = (event) =>{
    const hombre = "male";
    const mujer = "female";
    const sinGenero = "genderless";
    const desconocido = "unknown";
    const text = inputSearchGender.current.value;
    if(text === "hombre" || text === "hombres" || text === "male"){
      setSearchGender(hombre);
    }
    if(text === "mujer" || text === "mujeres" || text === "female"){
      setSearchGender(mujer);
    }
    if(text === "sin genero" || text === "genderless"){
      setSearchGender(sinGenero);
    }
    if (text === "desconocido" || text === "unknown") {
      setSearchGender(desconocido)
    }else{
    }
     }
   
     const onSearchSubmitGender = (event) => {
       if (event.key !== "Enter") return;
   
       inputSearchGender.current.value = "";
       searchCharacterGender(searchGender).then(setCharacters);
     }
   
     const handleClickGender = (event) => {
       searchCharacterGender(searchGender).then(setCharacters);
       inputSearchGender.current.value = "";
     }

  return (
   <div className='App'>

    <div className='searchs'>
      <div className='search'>
        <p>Buscar personaje por genero</p>
        <div>
        <input type="text" className='text'   ref={inputSearchGender} onChange={onChangeSearchGender}  onKeyDown={onSearchSubmitGender}/>
        <input type="submit" value="Buscar" className='buscar' onClick={handleClickGender}/>
        </div>
     </div>

    <div className='search'>
      <p>Buscar personaje</p>
        <div>
        <input type="text" className='text'   ref={inputSearch} onChange={onChangeSearch}  onKeyDown={onSearchSubmit}/>
        <input type="submit" value="Buscar" className='buscar' onClick={handleClick}/>
        </div>
    </div>
  </div>

<div className='App2'>
    <div className="App3">
{characters?.results?.map((item) => (
  <div key={item.id} className="card">
    <div className='imagen'>
    <img src={`https://rickandmortyapi.com/api/character/avatar/${item.id}.jpeg`} alt="" className='image' />
    </div>
    <div className='info'>
      <div>
      <p  className='name'>{item.name}</p>
        <span className='divS'>
        <ValidarStatus status ={item.status} />
        <p className='status'>{item.status} - {item.species}</p>
        </span>

      </div>
      <div>
      <p className='fecha'>Fecha de creacion:</p>
      <p className='created'>{item.created}</p>
      </div>
      <div className='div3'>
      <p className='locationN'>{item.location.name}</p>
      </div>
    </div>
  </div>
))}
</div>
</div>

<div className='setPage'>
<section className=''>
        <button className='button' variant="dark" onClick={() => onChangePage(-1)}>Prev</button>{page}
        <button className='button' variant="dark" onClick={() => onChangePage(1)}>Next</button>
      </section>
</div>

   </div>
  );
}

export default App;
