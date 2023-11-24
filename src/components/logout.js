
import { useEffect } from "react";
import axios from "axios";
// import utils from '../utilities/util.js'

export default function Logout() {
  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
          }
        );

        localStorage.clear();
        console.log("logout successfully");
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
}