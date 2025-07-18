import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Register from './components/RegisterUser/Register.jsx'
import Home from './components/Home/Home.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Layout from './components/Layout/Layout'
import ProfilePage from './components/ProfilePage/ProfilePage'
import CreateBlog from './components/CreateBlog/CreateBlog'
import UpdateBlog from './components/UpdateBlog/UpdateBlog'
import YourBlogs from './components/YourBlogs/YourBlogs'
import ViewBlog from './components/ViewBlog/ViewBlog'
import AllBlogs from './components/AllBlogs/AllBlogs'
import Comments from './components/Comments/Comments'
import SearchPage from './components/SearchPage/SearchPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

       {
        path: '/',
        element: <Navigate to="/home" replace />
      },
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
        path: '/blog/:blogId',
        element: <ViewBlog />
      },
      {
        path: '/get-published-blogs',
        element: <AllBlogs />
      },
      {
        path: '/search',
        element: <SearchPage />
      },

      {
        element: <Layout />,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />
          },
          {
            path: '/create-blog',
            element: <CreateBlog />
          },
          {
            path: '/blog/update-blog/:blogId',
            element: <UpdateBlog />
          },
          {
            path: '/blog/get-own-blogs',
            element: <YourBlogs />
          },
          {
            path: '/my-blogs/comments',
            element: <Comments />
          }
        ]

      }
    ]
  }
])


const perisitor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={perisitor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)