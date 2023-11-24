import { useEffect, useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'
import ButtonsComponent from './buttonsComponent.js'
import { Box} from '@mui/joy';

export default function Home() {
  // const [userToken, setUserToken] = useState(null)
  const user = JSON.parse(utils.getUserObject())

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
        <Box component="main"
          sx={{
            vmy: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }
          }}>
          <h4> {book.title}</h4>
          <ButtonsComponent book={book} removeBook={removeBook} user={user} />
        </Box>
      )) : null}
    </div>
  )
}