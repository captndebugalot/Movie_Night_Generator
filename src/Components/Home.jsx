import React from 'react';
import { Link } from 'react-router-dom';
import * as firebaseui from 'firebaseui' 
import firebase from 'firebase/compat/app'
import { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css'
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate()
    useEffect (() => {
        const ui  = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        console.log(ui)
        ui.start('#firebaseui-auth-container', {
        signInOptions: [
            // List of OAuth providers supported.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
         signInFlow: 'popup',
         callbacks: {
            signInSuccessWithAuthResult: (authResult, rediredtUrl) => {
                // console.log("Login Successful!")
                navigate('/movie-search');
                
                return false;
            },
         },

        });

    },[])
    
    return (
        <div>
            <h1>
                Home
            </h1>
            <div id='firebaseui-auth-container'></div>
        </div>
    );
}

export default Home