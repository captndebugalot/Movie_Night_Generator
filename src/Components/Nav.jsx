import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app';

function Nav() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const usRegisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setUser(user)
        })
        return () => usRegisterAuthObserver()
    }, [])

    const handleLinks = (e, path) => {
        e.preventDefault()
        if (!user?.uid) {
            alert("Please log in to use Cine-Byte features")
        } else {
            navigate (path)
        }
    }

    const handleAuth = () => {
        if(user?.uid) {
            firebase.auth().signOut()
            navigate('/')
        } else {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    navigate('/movie-search')
                })
                .catch((error) => {
                    console.error('Login error:', error)
                })
        }
    }

    return (
        <nav>
            <div className="navbar">
                <Link to="/" className="navbar-logo">
                    Cine-Byte
                </Link>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a 
                            href="/movie-search"
                            onClick={(e) => handleLinks(e, '/movie-search')}
                            className={!user?.uid ? 'link-disabled' : ''}
                        >
                            Movie Search
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/watchlist"
                            onClick={(e) => handleLinks(e, '/watchlist')}
                            className={!user?.uid ? 'link-disabled' : ''}
                        >
                            Watchlist
                        </a>
                    </li>
                    <li className="navbar-user">
                        {user?.uid && user.displayName}
                    </li>
                    <li>
                        <button onClick={handleAuth}>
                            {user?.uid ? 'Logout' : 'Log In'}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;