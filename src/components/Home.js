import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Login } from "./Login";
import { Register } from "./Register";
import { Card } from "./Card";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";

export const Home = () => {
    const location = useLocation();
    const hideNavbarRoutes = ["/login", "/register"];

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<Card />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutUs />} />

            </Routes>
        </>
    );
};
