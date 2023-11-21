import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import utils from '../utilities/util.js'
import React, { useState, useEffect } from "react";
import { Box, Stack, FormControl, FormLabel, Input, Button, Select, Option, MenuIcon, IconButton, Typography } from '@mui/joy';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (utils.getUserToken() !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <Box
      component="header"
      className="Header"
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: 'background.surface',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gridColumn: '1 / -1',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }
      ]}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Typography component="h1" fontWeight="xl" href="/">
          Borrow A Book
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {isAuth ? (
          <>
            <Typography component="a" fontWeight="xl" href="/book"> Add Book </Typography>
            <br />
            <Typography component="a" fontWeight="xl" href="/logout"> Logout </Typography>
          </>
        ) : (
          <Typography component="a" fontWeight="xl" href="/login"> Login </Typography>
        )}
      </Box>

    </Box>
  );
}
