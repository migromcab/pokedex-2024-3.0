import { Outlet, NavLink } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <div className="menu">
        <NavLink to="/">Listado</NavLink>
        <NavLink to="/terms-and-conditions">Términos y condiciones</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
