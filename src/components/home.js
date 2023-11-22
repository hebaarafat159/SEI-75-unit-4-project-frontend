import { useEffect, useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'
import ButtonsComponent from './buttonsComponent.js'
export default function Home() {
  // const [userToken, setUserToken] = useState(null)
  const [books, setBooks] = useState([])
  const [change, setChange] = useState(null)

  function removeBook(book) {
    if (book)
      setChange(book)
  }
  const fetchData = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_APP_PATH}/books/`, {
        headers: {
          Authorization: `Bearer ${utils.getUserToken()}`,
        },
      });
      // Process the response data
      console.log(`Books List : ${JSON.stringify(response.data)}`);
      setBooks(response.data)
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  useEffect(() => {
    if (utils.getUserToken() === null)
      window.location.href = "/login";
    else {
      fetchData()
    }
  }, [change]);

  return (
    <div className="Auth-form-container">
      <h1> Home Page </h1>
      {(books) ? books.map((book) => (
        <div>
          <h4> ID : {book.id} , Title: {book.title}</h4>
          <ButtonsComponent book={book} removeBook={removeBook} />
        </div>
      )) : null}
    </div>
  )
}