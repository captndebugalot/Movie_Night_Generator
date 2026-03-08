import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app';

function Nav() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const usRegisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            if (user?.uid !== undefined) {
                // console.log(user.displayName)
            }

            setUser(user)
        })
        return () => usRegisterAuthObserver()
    }, [])

    return (
        <nav>
            <div className="navbar">
                <Link to="/" ClassName="navbar-logo">
                    Cine-Byte
                </Link>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/movie-search">Movie Search</Link>
                    </li>
                    <li>
                        <Link to="/watchlist">Watchlist</Link>
                    </li>
                    <li className="navbar-user">
                        {user?.uid && user.displayName}
                    </li>
                    <li>
                        <button onClick={() => {
                            firebase.auth().signOut()
                            navigate('/')
                        }}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;