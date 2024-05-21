import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import { Employees } from './Pages/Employees/Employees.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/employees",
    element: <Employees />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
