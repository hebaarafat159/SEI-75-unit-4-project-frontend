import { Stack, Button } from '@mui/joy';
import axios from "axios";
import utils from '../utilities/util.js'

export default function ButtonsComponent({ book, removeBook }) {

    async function deleteBook(book) {
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

    return <Stack gap={4} sx={{ mt: 2 }}>
        <Stack gap={4} sx={{ mt: 2 }}>
            <Button fullWidth component="a" href={`/book/${book.id}`} book={book}> Edit {book.title} </Button>
            <Button onClick={()=> deleteBook(book)} fullWidth> Delete {book.id}</Button>
        </Stack>
    </Stack>
}