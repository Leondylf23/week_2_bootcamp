import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import CreatePage from './pages/Create';
import Home from './pages/Home';
import NavBar from './components/Navbar';
import { MainContext } from './components/MainContext';

import './index.css';
import LoadingContainer from './components/LoadingContainer';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/create",
//     element: <CreatePage />
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContext>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<LoadingContainer isFullHeight={true}/>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/work' element={<Home category={"work"} />} />
            <Route path='/family' element={<Home category={"family"} />} />
            <Route path='/personal' element={<Home category={"personal"} />} />
            <Route path='/:id' element={<CreatePage isFromDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* <RouterProvider router={router} fallbackElement={<LoadingContainer isFullHeight={true} />} /> */}
    </MainContext>
  </React.StrictMode>,
)
