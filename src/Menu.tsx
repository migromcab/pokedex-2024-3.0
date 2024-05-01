import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './components/button/Button';
import { SignUp } from './views/auth/SignUp';

export const Menu = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [search, setSearch] = useState('');
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/?search=${search}`);
          }}
        >
          <input placeholder="Search pokemons" value={search} onChange={(event) => setSearch(event.target.value)} />
        </form>
        <div className="flex gap-3 items-center">
          <NavLink to="/">Listado</NavLink>
          <Button
            size="sm"
            onClick={() => {
              setShowSignUp(true);
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
      <SignUp
        isOpen={showSignUp}
        close={() => {
          setShowSignUp(false);
        }}
      />
    </div>
  );
};
