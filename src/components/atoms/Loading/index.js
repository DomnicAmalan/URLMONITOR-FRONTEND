import './loading.scss'
import React, { useState, useEffect, useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import {LoadingContext} from 'hooks'

const Loading = ({children}) => {
  const {progress, setProgress} = useContext(LoadingContext)

  return(
    <div className="loading-container">
      <LoadingBar
        className="loader"
        progress={progress}
        height={4}
        color="red"
        onLoaderFinished={() => setProgress(0)}
      >
        {children}
      </LoadingBar>
    </div>
  )
}

export default Loading;