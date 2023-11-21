import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Book from "./components/book";
import Home from "./components/home";
import { Navigation } from "./components/navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;