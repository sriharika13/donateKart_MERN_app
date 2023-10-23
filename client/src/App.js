import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./components/HomeComponent/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  const router= createBrowserRouter([
    {path:'/register', element: <Register/>},
    {path:'/login', element: <Login/>},
    {path:'/', element: <Home/>},
    {path:'/success', element: <Success/>},
    {path:'/cancel', element: <Cancel/>},

  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
