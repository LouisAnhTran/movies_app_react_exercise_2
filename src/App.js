import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const API_URL='http://www.omdbapi.com/?apikey=f5d750da&';
const test_name="superman";

const movie_ran={
  "Title": "Superman",
  "Year": "1978",
  "imdbID": "tt0078346",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
}

function App() {
  const [movies,setMovies]=useState([]);
  const [search,setSearch]=useState('');

  const get_movies=async(title)=>{
    try {
      const response= await fetch(`${API_URL}s=${title}`);
      const data= await response.json();
      console.log(data.Search);
      setMovies(data.Search);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(()=>{
    get_movies('all movies');
  },[])

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className='search'>
        <input 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Search for value'
         />
         
         <img
          src={logo}
          alt="search"
          onClick={() => get_movies(search)}
        />
      </div>

      {movies.length>0 ? (
        <div className='container'>
          {movies.map((movie)=>(
            <MovieCard imdbID={movie.imdbID} year={movie.Year} poster={movie.Poster} type={movie.Type} title={movie.Title}></MovieCard>
          ))}
        </div>
      ):(
        <div className="empty">
        <h2>No movies found</h2>
      </div>
      )}

      

      

    </div>
  );
}

export default App;
