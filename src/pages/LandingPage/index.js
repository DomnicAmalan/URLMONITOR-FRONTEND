import React, {useContext, useEffect, useCallback, useState} from 'react';
import './landingpage.scss';
import {LoadingContext} from 'hooks'
import {Loading, Password} from 'atoms';
import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { AuthButtons, Toast } from 'atoms';
import { useTranslation } from 'react-i18next';
import "firebase/auth";
import firebase from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { toast } from 'react-toastify';
import { createUser, checkUser, authenticate, test } from '../../api';
import { Button } from 'antd';
import LocalStorageService from "../../helpers/LocalStorageService";

firebase.initializeApp(firebaseConfig);

const Landingpage = ({history}) => {
  const {progress, setProgress} = useContext(LoadingContext);
  const [getPassword, setGetPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const localStorageService = LocalStorageService.getService();
  
  const googleAuthMethod = useCallback(async() => {
      try{
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        const userData = await firebase.auth().signInWithPopup(googleAuthProvider);
        const {user} = userData;
        setEmail(user.email)
        setProgress(30)
        const check = await checkUser({email: user.email});
        if(check){
          setProgress(50);
          const data = await authenticate({email: user.email})
          setToken(data);
          setProgress(100)
          history.push("/app/dashboard")
        }
        else{
          setProgress(30);
          const data = await createUser({email: email});
          if(data){
            const {jwt} = await authenticate({email: user.email});
            await setToken(jwt);
            history.push("/app/dashboard");        
          }
          else{
            toast("User not created")
          }
        }
      }
      catch(err){
        toast(err.message, {toastId: "google-login",  delay:100})
      }
    }
  )

  const setToken = async(data) => {
    localStorageService.setToken(data)
  }

  const create = async() => {
    if(email && password){
      const data = await createUser({email: email, password: password});
      if(data){
        const {jwt} = await authenticate({email: user.email})
        setToken(jwt)
      }
      else{
        toast("User not created")
      }
    }
    else{
      toast("Please create password")
    }
  }


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
            <>
              <Password onChange={setPassword} />
              <Button type="primary" block onClick={() => create()}>
                Primary
              </Button>
            </>
            : 
            <>
            <AuthButtons
              provider="google"
              title={t('authbuttons.google.title')}
              icon={faGoogle}
              style={{ color: '#15AABF' }}
              action={googleAuthMethod}
            />
            <div onClick={() => test()}>TEST</div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Landingpage;