import { Box, Stack, FormControl, FormLabel, Input, Button, Select, Option } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Book() {
    const [userToken, setUserToken] = useState(null)
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [publishedDate, setPublishedDate] = useState(dayjs(new Date()));//dayjs(new Date())
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [authors, setAuthors] = useState([{ id: 5, name: "Jake", "avatar_url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhAPDxAPDw8PFRAQEBAPDw8PEBUPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGBAQGS0dFx8tKystLS0tLSstLS0tLS0tLS0tLSstLSstLS0tL" }, { id: 34, name: "Lili", "avatar_url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhIREhESEhESGhwSFBESGRIZHRgZGBwZGh0cGh4cIS4lHB8rIRoYJzgnKy8xNTU1HCQ7QDs1Py40NTEBDAwMEA8QHhISHTcsJCw0NzQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQxNDQxN" }]);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTE5MjQxLCJpYXQiOjE3MDA1MTg2NDEsImp0aSI6ImQ3MDQyNTVhY2Y5YTQ1MzBiNDJmOGI5ZTcwODc5Y2M5IiwidXNlcl9pZCI6MX0.N5vLl7PwrPUWcYdw3PsnedwPQS8HaAU8OsiAS_SXfQ4'
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/authors', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Process the response data
            console.log(`author List : ${JSON.stringify(response.data)}`);
            setAuthors(response.data)
        } catch (error) {
            console.error('Request failed', error);
        }
    }
    useEffect(() => {
        if (utils.getUserToken() === null)
            window.location.href = "/login";
        else {
            // Load authors from database
            // fetchData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTE5MjQxLCJpYXQiOjE3MDA1MTg2NDEsImp0aSI6ImQ3MDQyNTVhY2Y5YTQ1MzBiNDJmOGI5ZTcwODc5Y2M5IiwidXNlcl9pZCI6MX0.N5vLl7PwrPUWcYdw3PsnedwPQS8HaAU8OsiAS_SXfQ4')//(utils.getRefreshToken())
        }
    }, [userToken]);

    async function submit(e) {
        e.preventDefault();
        const book = {
            title: title,
            category: category,
            description: description,
            publishedDate: publishedDate,
            author: selectedAuthor
        };
        console.log(`Submit Book : ${JSON.stringify(book)}`)
        if (book) {
            const { data } = await axios.post(`${process.env.REACT_APP_URL_APP_PATH}/book/`, book,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
                {
                    withCredentials: true
                },
            );
            // window.location.href = "/";
        }
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
                            <DatePicker defaultValue={publishedDate} value={publishedDate}
                                slotProps={{ textField: { size: 'small' } }}
                                onChange={(date, event) => {
                                    console.log(new Date(date));
                                    setPublishedDate(new Date(date))
                                }} />
                        </LocalizationProvider>
                    </FormControl>

                    {/* Author Field */}
                    <Select placeholder="Choose an author" onChange={(e, newValue) => {
                        let index = authors.findIndex(author => author.id === newValue);
                        if (index !== -1)
                            setSelectedAuthor(authors[index])
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