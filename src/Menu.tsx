import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const { i18n } = useTranslation();

  return (
    <div className="menu">
      <div className="flex gap-3">
        <button className={i18n.language === 'es' ? 'font-bold' : ''} onClick={() => i18n.changeLanguage('es')}>
          Español
        </button>
        <button className={i18n.language === 'en' ? 'font-bold' : ''} onClick={() => i18n.changeLanguage('en')}>
          Inglés
        </button>
      </div>
      <div className="flex gap-3">
        <NavLink to="/">Listado</NavLink>
        <NavLink to="/terms-and-conditions">Términos y condiciones</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
      </div>
    </div>
  );
};
