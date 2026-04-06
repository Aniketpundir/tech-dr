import React from 'react'
import "./App.css"
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Pages/Home';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
        </Route>
    )
)

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App