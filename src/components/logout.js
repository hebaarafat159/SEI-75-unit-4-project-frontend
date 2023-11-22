
import { useEffect } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Logout(){
  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL_APP_PATH}/logout/`,
          {
            refresh_token: utils.getRefreshToken(),
          },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
  }