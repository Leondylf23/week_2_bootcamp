import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home';
import NavBar from './components/Navbar';
import DetailPage from './pages/Detail';

import './index.css';
import FavoritePage from './pages/Favorite';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />
  },
  {
    path: "/:id",
    element: <DetailPage />
  },
  {
    path: "/favorite",
    element: <FavoritePage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
