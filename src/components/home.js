import { useEffect, useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Home() {
  const [userToken, setUserToken] = useState(null)
  const [books, setBooks] = useState([])

  const fetchData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Process the response data
      console.log(`Books List : ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  useEffect(() => {
    if (utils.getUserToken() === null)
      window.location.href = "/login";
    else {
      // Load books data
      fetchData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTEzOTg3LCJpYXQiOjE3MDA1MTMzODcsImp0aSI6IjJmYTg3ZGY2NmYxMzRlZGM4MDk1YjIxMGU0MDI1MGMxIiwidXNlcl9pZCI6MX0.kX7ITArXmD5mGUTqKBw9Bx428MbVszCZVVVJ68XT_BU')//(utils.getRefreshToken())
      // const { data } = axios.get(
      //   "http://localhost:8000/books",
      //   {
      //     refresh_token: utils.getRefreshToken(),
      //   },
      //   { headers: { "Content-Type": "application/json" } },
      //   { withCredentials: true }
      // );

      // console.log(`Books List : ${JSON.stringify(data)}`);
    }
  }, [userToken, books]);

  return (

    <div className="Auth-form-container">
      <h1> Home Page </h1>
      {
        (books) ?
          <>
            Books List
            {/* {{ books }} */}
          </> : null
      }
    </div>
  )
}