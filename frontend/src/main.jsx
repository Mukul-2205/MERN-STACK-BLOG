import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Register from './components/RegisterUser/Register.jsx'
import Home from './components/Home/Home.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'
import Dashboard from './components/DashBoard/Dashboard'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])


const perisitor=persistStore(store)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={perisitor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)