import {useState, useEffect} from 'react'
import {collection, addDoc} from "firebase/firestore"; 
import {db} from '../db'
import firebase from 'firebase/compat/app';

export function MovieCard({movie}) {

  const [isAdding, setIsAdding] = useState(false)
  const [user, setUser] = useState({})
   
  useEffect(() =>{
      const usRegisterAuthObserver =  firebase.auth().onAuthStateChanged(user => {
          setUser(user)
      })

      return () => usRegisterAuthObserver()
  },[])


  const handleAddToWatchlist = async () => {
    if (!user?.uid) {
        alert('Please log in to add movies to your watchlist')
        return; 
    } 

    setIsAdding(true)
    try {
      await addDoc(collection(db, 'users', user.uid,  "watchlist"), {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster, 
        watched: false,
        addedAt: new Date()
      })
      alert(`${movie.Title} added to your watchlist!`)

    } catch (error) {
        console.error('Error adding to watchlist: ', error)
        alert('Something went wrong. Please try again.')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="card">
        <img 
            src={movie.Poster !=='N/A' ? movie.Poster : '/no-poster.png'}
            alt={movie.Title}
            style={{ width: '60px', height: '90px', objectFit: 'cover' }}
        />
        <div className='card-info'>
            <div>{movie.Title} ({movie.Year})</div>
            <button 
                onClick={handleAddToWatchlist} 
                disabled={isAdding}
            >
                {isAdding ? 'Adding...' : 'Add to Watchlist'}    
            </button>
        </div>
    </div>
   
  )
}

export default MovieCard