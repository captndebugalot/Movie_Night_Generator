import * as firebaseui from 'firebaseui' 
import firebase from 'firebase/compat/app'
import { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css'
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
    useEffect (() => {
        const ui  = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
         signInFlow: 'popup',
         callbacks: {
            signInSuccessWithAuthResult: () => {
                navigate('/movie-search');
                
                return false;
            },
         },

        });

    },[navigate])

    return (
        <div>
            <h1>
                Welcome to Cine-Byte
            </h1>
            <p>
                Search movies, build your watchlist, and let us pick tonight&apos;s movie!
            </p>
            <img 
                src='/movie-reel.png' 
                alt='old movie camera'
                style={{ width: '400px', height: '210px', objectFit: 'cover' }}
            />
            <div id='firebaseui-auth-container'></div>
        </div>
    );
}

export default Home