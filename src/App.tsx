import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AuthForm from "./components/AuthForm";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoutes from "./router/ProtectedRoutes";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Movies from "./pages/movies/Movies";
import PageLayout from "./layouts/mainLayout/PageLayout";
import FavoriteMovies from "./pages/account/FavoriteMovies";
import SearchMovies from "./pages/search/SearchMovies";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard />} />
            {/* Movies */}
            <Route path="/movies" element={<PageLayout title="Movies"><Movies /></PageLayout>} />
            {/* <Route path="/movies/:id" element={<Movie />} /> */}


            <Route path="/search" element={<PageLayout title="Search"><SearchMovies /></PageLayout>} />
            <Route path="/profile" element={<PageLayout title="Profile"><FavoriteMovies /></PageLayout>} />
            <Route path="/favorite-movies" element={<PageLayout title="Favorite Movies"><FavoriteMovies /></PageLayout>} />
          </Route>

          
        </Route>

        <Route path="/login" element={<AuthLayout><AuthForm /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
      </Routes>
    </>
  );
}

export default App;
