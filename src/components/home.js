import { useEffect, useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Home() {
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    if (utils.getUserToken() === null)
      window.location.href = "/login";
    else {
      // Load books data
    }
  }, [userToken]);

  return (

    <div className="Auth-form-container">
      <h1> Home Page </h1>
    </div>
  )
}