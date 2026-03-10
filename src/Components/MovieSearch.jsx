import {useState} from 'react'
import MovieService from '../MovieService'
import MovieCard from './MovieCard'
import { validateSearchInput } from '../utils'

function MovieSearch() {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        setError('')
        setResults([])

    const validation = validateSearchInput(title, year)
        if (!validation.ok) {
            setError(validation.message)
            return
        }

        setIsSearching(true)

        MovieService.search(title.trim(), year.trim())
            .then((data) => {
                if(!data || data.Response === 'False') {
                    setResults([])
                    setError('No results found.')
                    return
                }
                const unique = data.Search.filter((movie, index, self) =>
                index === self.findIndex((m) => m.imdbID === movie.imdbID)
                )
                setResults(unique)
            })
            .catch((err) => {
                console.error(err)
                setError('Error fetching movies.')
            })
            .finally(() => {
                setIsSearching(false)
            })
    }


    return (
        <div className='movie-search'>
            <h1>Movie Search</h1>

            <form onSubmit={handleSubmit} className='search-form'>
                <div className="field">
                    <label htmlFor='title'>Title: </label>
                    <input 
                        id='title'
                        type='text'    
                        placeholder='e.g. Batman'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div className='field'>
                    <label htmlFor='year'>Year (optional): </label>
                    <input 
                        id='year'
                        type='text'
                        placeholder='2017'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <button type='submit' disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
                {error && <p className='error'>{error}</p>}
                
                <button type="button" onClick={() => setResults([])}>
                    Clear Results
                </button>
            </form>

            <div className='results'>
                {results.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
            
        </div>
    )
}

export default MovieSearch;