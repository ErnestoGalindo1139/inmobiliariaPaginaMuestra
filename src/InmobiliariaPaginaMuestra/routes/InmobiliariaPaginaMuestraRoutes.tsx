import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import React from 'react';
// import { Navbar } from '../components/ui/NavBar';

export const InmobiliariaPaginaMuestraRoutes = (): React.JSX.Element => {
  return (
    <>
      {/* Aqui va el NavbarComponent */}
      {/* <Navbar /> */}

      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      {/* Aqui va el FooterComponent */}
    </>
  );
};
