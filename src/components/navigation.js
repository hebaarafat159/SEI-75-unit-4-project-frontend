import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import utils from '../utilities/util.js'
import React, { useState, useEffect } from "react";
export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (utils.getUserToken() !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Borrow A Book</Navbar.Brand>
        <Nav className="me-auto">
          {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
        </Nav>
        <Nav>
          {isAuth ? (
            <Nav.Link href="/logout">SignOut</Nav.Link>
          ) : (
            <Nav.Link href="/login">SignIn</Nav.Link>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
