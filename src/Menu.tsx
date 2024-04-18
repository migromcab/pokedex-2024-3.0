import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Button } from './components/button/Button';

export const Menu = () => {
  const { i18n } = useTranslation();
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const menuNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPosition = menuNode.current?.offsetTop ?? 0;
    const scrollListener = () => {
      if (!menuNode.current) {
        return;
      }
      const matchesIsFixed = currentPosition < window.scrollY;
      if (matchesIsFixed && !isMenuFixed) {
        setIsMenuFixed(true);
      }

      if (!matchesIsFixed && isMenuFixed) {
        setIsMenuFixed(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [isMenuFixed]);

  return (
    <div ref={menuNode} className="menu-wrapper">
      <div className={`menu ${isMenuFixed ? 'menu--fixed' : ''}`}>
        <div className="flex gap-3">
          <Button
            block
            disabled
            className={i18n.language === 'es' ? 'font-bold' : ''}
            onClick={() => i18n.changeLanguage('es')}
          >
            Español
          </Button>
          <Button className={i18n.language === 'en' ? 'font-bold' : ''} onClick={() => i18n.changeLanguage('en')}>
            Inglés
          </Button>
        </div>
        <div className="flex gap-3">
          <NavLink to="/">Listado</NavLink>
          <NavLink to="/terms-and-conditions">Términos y condiciones</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
        </div>
      </div>
    </div>
  );
};
