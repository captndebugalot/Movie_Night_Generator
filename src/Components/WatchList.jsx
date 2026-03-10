import { collection, onSnapshot, orderBy, query, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from '../db'
import firebase from 'firebase/compat/app';


function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState({})
    const [countdown, setCountdown] = useState(null)
    const [pick, setPick] = useState(null)
 
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

    const handleWatched = async (movieID, currentWatched) =>{
        await updateDoc(doc(db,'users', user.uid, 'watchlist', movieID), {
            watched: !currentWatched
        })
    }

    const handleRemove = async (movieID) =>{
        await deleteDoc(doc(db, 'users', user.uid, 'watchlist', movieID))
    }

    const handlePick = () => {
        const unwatched = movies.filter(m=> !m.data().watched)
        if (unwatched.length === 0) {
            alert ('No unwatched movies in your list')
            return
        }
        const random = unwatched[Math.floor(Math.random()* unwatched.length)]

        let count = 3
        setCountdown(count)

        const timer = setInterval(() => {
            count -= 1
            if (count === 0) {
                clearInterval(timer)
                setCountdown(null)
                setPick(random.data())
            } else {
                setCountdown(count)
            }

        }, 1000)
    }

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
                                <button 
                                    onClick={() => handleWatched(movie.id, data.watched)}
                                    className={data.watched ? 'watched-btn active' : 'watched-btn'}
                                >
                                    {data.watched ? 'Watched' : 'Mark as Watched'}
                                </button>
                                <button onClick={() => handleRemove(movie.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <p>Your watchlist is empty. Search for movies to add!</p>
        )}
        <div className="picker">
            <p></p>
            <button onClick={handlePick}>Pick a Random Movie</button>
            {countdown && <p>Picking in {countdown}...</p>}
            {pick && <p>Tonight&apos;s Pick: {pick.Title} ({pick.Year})</p>}
        </div>
    </div>

)
}

export default Watchlist