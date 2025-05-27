import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthLayout } from './components/index.js'
import { Chats, Login, Register, Home, VerifyEmail } from './pages/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: '/register',
        element: (
          <AuthLayout authentication={false}>
            <Register/>
          </AuthLayout>
        )
      },
      {
        path: '/chats',
        element: (
          <AuthLayout authentication>
            <Chats/>
          </AuthLayout>
        )
      },
      {
        path: '/verify-email/:token',
        element: (
          <AuthLayout authentication={false}>
            <VerifyEmail/>
          </AuthLayout>
        )
      }
    ],
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
