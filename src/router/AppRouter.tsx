import { Route, Routes } from 'react-router-dom';
import { InmobiliariaPaginaMuestraRoutes } from '../InmobiliariaPaginaMuestra/routes/InmobiliariaPaginaMuestraRoutes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<InmobiliariaPaginaMuestraRoutes />} />
      </Routes>
    </>
  );
};
