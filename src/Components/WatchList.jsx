import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from '../db'
import firebase from 'firebase/compat/app';
import MovieCard from "./MovieCard";

function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState({})
 
    useEffect(() =>{
        const usRegisterAuthObserver =  firebase.auth().onAuthStateChanged(user => {
            setUser(user)
        })

        return () => usRegisterAuthObserver()
    },[])

    useEffect(() => {
        if (user?.uid === undefined) {
            return
        }
        const movieQuery = query(collection(db, 'users', user.uid, `watchlist`), orderBy("addedAt", "desc"));
        const unsubscribe = onSnapshot(movieQuery, (snapshot) => {
            setMovies(snapshot.docs);
        });

        return () => unsubscribe();
    }, [user]);

return (
    <div className="watchlist">
        <h1>My Watchlist</h1>

        {movies.length > 0 ? (
            movies.map((movie) => {
                const data = movie.data();
                return (
                    <div key={movie.id} className="watchlist-card">
                        <img
                            src={data.Poster !== 'N/A' ? data.Poster : '/no-poster.png'}
                            alt={data.Title}
                            style={{ width: '90px', height: '110px', objectFit: 'cover' }}
                        />
                        <div className="watchlist-info">
                            <p>{data.Title} ({data.Year})</p>
                            <div className="watchlist-buttons">
                                <button>{data.watched ? 'Watched ✓' : 'Mark as Watched'}</button>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <p>Your watchlist is empty. Search for movies to add!</p>
        )}
    </div>
)
}

export default Watchlist