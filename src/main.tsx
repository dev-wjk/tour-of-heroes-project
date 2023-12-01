import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Heroes from './pages/Heroes.tsx';
import HeroDetail from './pages/HeroDetail.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/detail/:id" element={<HeroDetail />} />
          </Route>
        )
      )}
    />
  </React.StrictMode>
);
