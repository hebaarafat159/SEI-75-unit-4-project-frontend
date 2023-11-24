import { Stack, Button } from '@mui/joy';
import axios from "axios";
import utils from '../utilities/util.js'

export default function ButtonsComponent({ book, removeBook, user }) {

    async function deleteBook(book) {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.delete(`${process.env.REACT_APP_URL_APP_PATH}/books/${book.id}/delete/`, book,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${utils.getUserToken()}`,
                },
            },
            {
                withCredentials: true
            },
        );
        removeBook(book)
        window.location.href = "/";
    }

    return (
        <Stack gap={4} sx={{ mt: 2 }}>
            {(user && user.id === book.customer.id) ? < Stack gap={4} sx={{ mt: 2 }}>
                <Button fullWidth component="a" href={`/book/${book.id}`} book={book}> Edit </Button>
                <Button onClick={() => deleteBook(book)} fullWidth> Delete </Button>
            </Stack> :
                < Stack gap={4} sx={{ mt: 2 }}>
                    <Button fullWidth> Borrow </Button>
                </Stack>
            }

        </Stack >)
}