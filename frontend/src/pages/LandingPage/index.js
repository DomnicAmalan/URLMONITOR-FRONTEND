import React, {useContext, useEffect, useCallback, useState} from 'react';
import './landingpage.scss';
import {LoadingContext} from 'hooks'
import {Loading} from 'atoms';
import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { AuthButtons, Toast } from 'atoms';
import { useTranslation } from 'react-i18next';
import "firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { toast } from 'react-toastify';
import { createUser, checkUser, authenticate } from '../../api'
import axios from 'axios';

firebase.initializeApp(firebaseConfig);

const Landingpage = () => {
  const {progress, setProgress} = useContext(LoadingContext);
  const [getPassword, setGetPassword] = useState(false)
  
  const googleAuthMethod = useCallback(async() => {
      try{
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        const userData = await firebase.auth().signInWithPopup(googleAuthProvider);
        const {user} = userData;
        const check = await checkUser({email: user.email});
        // const data = await createUser({email: user.email});
        // if(check){
        //   setProgress(50);
        //   authenticate({email: user.email})
        // }
        // else{
        //   if(user){
        //     setProgress(50);
        //     try{
        //       setGetPassword(true)
        //       // const data = await createUser({email: user.email});
        //     }
        //     catch(err){
        //       toast(err.message)
        //     }
        //   }
          
          
        // }
      }
      catch(err){
        console.log(err)
        toast(err.message, {toastId: "google-login",  delay:100})
      }
    }
  )


  const { t } = useTranslation();

  useEffect(() => {
    setProgress(100)
  }, [])

  return( 
    <div className="landing-wrapper">
      <Loading />
      <div className="header-container">
        <h1>Sparrow Ping</h1>
        <h2>Welcome to Sparrow ping</h2>
      </div>
      <div className="container">
        <div className="login-container">
          {
            getPassword ? 
            <input type="password" />
            : 
            <AuthButtons
              provider="google"
              title={t('authbuttons.google.title')}
              icon={faGoogle}
              style={{ color: '#15AABF' }}
              action={googleAuthMethod}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Landingpage;