import { Box, Stack, FormControl, FormLabel, Input, Button, FormHelperText, InfoOutlined } from '@mui/joy';
import { useState } from "react";
import axios from "axios";
import utils from '../utilities/util.js'

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (password !== confirmPassword)
    //TODO show error
      alert(`password don\'t matched`)
    else {
      const user = {
        username: username,
        password: password,
        email: email
        // location: location
      };
      console.log(`Register Data : ${JSON.stringify(user)}`)
      if (user) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_URL_APP_PATH}/register/`,
            {
              user_data: user,
            },
            {
              headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(`${process.env.BACKEND_SUPER_USER_NAME}: ${process.env.BACKEND_SUPER_USER_PASSWORD}`),
              }
            },
            { withCredentials: true }
          );
          // TODO handle save new user
          // utils.storeLoggedInUser(data)
          // window.location.href = "/";
        } catch (e) {
          console.log("logout not working", e);
        }

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
          {/* Username Filed */}
          <FormControl required>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          {/* Email Filed */}
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          {/* Password Filed */}
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {/* Confirm Password Filed */}
          <FormControl required>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <FormHelperText>
              Opps! something is wrong.
            </FormHelperText>
          </FormControl>
          {/* Location Field */}
          //TODO change to google places API
          <FormControl required>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <Stack gap={4} sx={{ mt: 2 }}>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
}