import {useState} from 'react'
import MovieService from './MovieService'

function MovieSearch() {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        // clear previous results and errors
        setError('')
        setResults([])

        if (!title.trim()) {
            setError('Title is required')
            return
        }
        
        if (year && year.trim() !=='' && !/^\d{4}$/.test(year.trim())) {
            setError('Year must be 4 digits or leave blank')
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
                <div className='fiels'>
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
            </form>

            <div className='results'>
                {results.map((movie) => (
                    <div key={movie.imdbID} className="card">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/no poster.png'}
                            alt={movie.Title}
                            style={{width: '80ox'}}
                        />
                        <div>{movie.Title} ({movie.Year})</div>
                        <button>Add to Watchilist</button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default MovieSearch;