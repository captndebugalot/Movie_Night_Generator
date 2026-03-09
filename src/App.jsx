import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Components/Home';
import './db'
import MovieSearch from "./Components/MovieSearch";
import Watchlist from "./Components/WatchList";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-search" element={<MovieSearch />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
