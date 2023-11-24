import { Box, Stack, FormControl, FormLabel, Input, Button, Typography, Link } from '@mui/joy';
import { useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        // console.log(`Submit Login : ${JSON.stringify(user)}`)
        if (user) {
            try {
                const token = await axios.post(`${process.env.REACT_APP_URL_APP_PATH}/token/`, user,
                    {
                        headers: { "Content-Type": "application/json" },
                    },
                    {
                        withCredentials: true
                    },
                );

                console.log(`Token: ${JSON.stringify(token.data)}`)


                const userObject = await axios.get(`${process.env.REACT_APP_URL_APP_PATH}/customers/${user.username}/${user.password}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.data.access}`,
                    },
                });
                // Process the response data
                console.log(`User Object List : ${JSON.stringify(userObject.data)}`);
                utils.storeLoggedInUser(token.data, userObject.data)
                if (userObject.data.id)
                    window.location.href = "/";
            } catch (error) {
                console.error('Request failed', error);
            }
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
                    <FormControl required>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                        <Button type="submit" fullWidth>
                            Sign in
                        </Button>
                        <Typography level="body-sm">
                            New to company?{' '}
                            <Link href="/register" level="title-sm">
                                Sign up!
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Stack>
        </Box>
    )
}