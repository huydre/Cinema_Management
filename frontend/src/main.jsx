import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import { Employees } from './Pages/Employees/Employees.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Films } from './Pages/Films/Films.jsx';
import { Toaster } from 'react-hot-toast';
import Schedule from './Pages/Schedule/Schedule.jsx';
import { Ticket } from './Pages/Ticket/Ticket.jsx';
import Login from './Pages/Authenticate/Login.jsx';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import Layout from './Components/Layout/Layout.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/employees",
    element: <Employees />
  },
  {
    path: "/films",
    element: <Films />
  },
  {
    path: "/schedule",
    element: <Schedule />
  },
  {
    path: "/tickets",
    element: <Ticket />
  },
  {
    path: "/login",
    element: <Login />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <div>
          <Toaster/>
        </div>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
