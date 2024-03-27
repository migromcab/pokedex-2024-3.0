import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/">Listado</NavLink>
      <NavLink to="/terms-and-conditions">Términos y condiciones</NavLink>
      <NavLink to="/privacy">Privacy</NavLink>
    </div>
  );
};
