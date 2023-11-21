import { useEffect, useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Home() {
  const [userToken, setUserToken] = useState(null)
  const [books, setBooks] = useState([])

  const fetchData = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_APP_PATH}/books/`, {
        headers: {
          Authorization: `Bearer ${utils.getUserToken()}`,
        },
      });
      // Process the response data
      console.log(`Books List : ${JSON.stringify(response)}`);
      setBooks(response.data)
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  useEffect(() => {
    if (utils.getUserToken() === null)
      window.location.href = "/login";
    else {
      // Load books data
      console.log(`token :: ${utils.getUserToken()}`)
      fetchData()
    }
  }, [userToken]);

  return (

    <div className="Auth-form-container">
      <h1> Home Page </h1>
      {(books) ? books.map((book) => (
        <h4>{book.title}</h4>
      )) : null}
    </div>
  )
}