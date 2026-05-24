import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";// Import thik koren
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)