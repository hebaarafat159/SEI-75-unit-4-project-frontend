import { Box, Stack, FormControl, FormLabel, Input, Button, Select, Option } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import axios from "axios";
import utils from '../utilities/util.js'
import { useParams } from 'react-router';

export default function Book({ book }) {
    const { id } = useParams();

    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [publishedDate, setPublishedDate] = useState(dayjs(new Date()));
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [authors, setAuthors] = useState([])

    const [bookObject, setbookObject] = useState(null)

    const loadAuthors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_APP_PATH}/authors/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${utils.getUserToken()}`,
                },
            });
            // Process the response data
            console.log(`author List : ${JSON.stringify(response.data)}`);
            setAuthors(response.data)
        } catch (error) {
            console.error('Request failed', error);
        }
    }

    const loadBook = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_APP_PATH}/books/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${utils.getUserToken()}`,
                },
            });
            // Process the response data
            console.log(`Book Details List : ${JSON.stringify(response.data)}`);
            if (response.data) {
                setbookObject(response.data)

                setCover(response.data.cover_image)
                // set Title
                setTitle(response.data.title)

                // set Category
                setCategory(response.data.category)

                // set description
                setDescription(response.data.description)

                // set published date
                setPublishedDate(dayjs(new Date(response.data.published_date)))

                // set author
                setSelectedAuthor(response.data.author)
            }
        } catch (error) {
            console.error('Request failed', error);
        }
    }
    useEffect(() => {
        if (utils.getUserToken() === null)
            window.location.href = "/login";
        else {
            // Load authors from database
            loadAuthors()
            if (id !== '0') {
                loadBook(id)
            }

        }
    }, [id]);

    async function submit(e) {
        e.preventDefault();
        saveBook()
    }

    async function saveBook() {
        const owner = JSON.parse(utils.getUserObject())
        console.log(`THe User : ${JSON.stringify(owner)}`)
        if (id === '0')
            addBook(owner)
        else
            updateBook(owner)
    }

    async function addBook(owner) {
        const newBook = {
            title: title,
            category: category,
            description: description,
            published_date: '2023-11-22',//publishedDate,
            author_id: selectedAuthor.id,
            cover_image: "jfhlwfhlwfj;e;o;wo",
            customer_id: owner.id
        };

        console.log(`Book : ${JSON.stringify(newBook)}`)
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(`${process.env.REACT_APP_URL_APP_PATH}/books/add/`, newBook,
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
        console.log(`Saved Book : ${JSON.stringify(data)}`)

        // if (data.status === 200)
        // window.location.href = "/";
    }

    async function updateBook() {
        bookObject['title'] = title
        bookObject['category'] = category
        bookObject['description'] = description
        bookObject['published_date'] = '2023-11-22'//publishedDate
        bookObject['author'] = selectedAuthor
        bookObject['cover_image'] = "jfhlwfhlwfj;e;o;wo"
        bookObject['owner'] = utils.getUserObject()
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(`${process.env.REACT_APP_URL_APP_PATH}/books/${bookObject.id}/update/`, bookObject,
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
    }
    return (
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
            <Stack gap={4} sx={{ mt: 2 }}>
                <form onSubmit={submit}>
                    {/* Cover Field */}
                    {(cover) ? <img
                        src={`${cover}?h=120&fit=crop&auto=format`}
                        alt={cover}
                        value={cover}
                    /> : null}
                    <FormControl required>
                        <FormLabel>Cover Image</FormLabel>
                        <Input
                            type="text"
                            name="cover"
                            onChange={(e) => setCover(e.target.value)} />
                    </FormControl>

                    {/* Title Field */}
                    <FormControl required>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>

                    {/* Category Field */}
                    <FormControl required>
                        <FormLabel>Category</FormLabel>
                        <Input type="text"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} />
                    </FormControl>

                    {/* Description Field */}
                    <FormControl required>
                        <FormLabel>Description</FormLabel>
                        <Input type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>

                    {/* published Date Field */}
                    <FormControl required>
                        <FormLabel>Publish Date</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={publishedDate} value={publishedDate} key={publishedDate}
                                slotProps={{ textField: { size: 'small' } }}
                                onChange={(date, event) => {
                                    console.log(utils.formateDate(date))
                                    // TODO set the correct date
                                    // setPublishedDate(utils.formateDate(date))
                                }} />
                        </LocalizationProvider>
                    </FormControl>

                    {/* Author Field */}
                    <Select placeholder="Choose an author" onChange={(e, newValue) => {
                        let index = authors.findIndex(author => author.id === newValue);
                        if (index !== -1) {
                            console.log(`Selected Author: ${JSON.stringify(authors[index])}` )
                            setSelectedAuthor(authors[index])
                        }
                    }}>
                        {(authors) ? authors.map((auth) => (
                            <Option key={auth.id} value={auth.id}>{auth.name}</Option>
                        )) : null}
                    </Select>

                    <Stack gap={4} sx={{ mt: 2 }}>
                        <Button type="submit" fullWidth>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
}