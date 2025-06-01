import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Register from './components/RegisterUser/Register.jsx'
import Home from './components/Home/Home.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)