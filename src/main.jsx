import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz.jsx';
import AllAnswer from './pages/AllAnswer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/quiz',
        element: <Quiz/>
      },
      {
        path: '/all-answer',
        element: <AllAnswer/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
