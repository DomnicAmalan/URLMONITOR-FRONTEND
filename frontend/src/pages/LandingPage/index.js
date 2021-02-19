import React, {useState, useEffect} from 'react';
import {Loading} from 'atoms';
import './landingpage.scss';

const Landingpage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])

  return( 
    <>
      {
        loading ? 
        <Loading />:
        <div className="landing-wrapper">
          <div className="header-container">
            <h1>Sparrow Ping</h1>
          </div>
         
        </div>
      }
    </>
  )
}

export default Landingpage;