import { Outlet, NavLink } from 'react-router-dom';
import { Menu } from './Menu';
import { UserContextProvider } from './UserContextProvider';
import { UserInfo } from './UserInfo';

export const App = () => {
  return (
    <div>
      <UserContextProvider>
        <div>
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" />
          <Menu />
        </div>
        <UserInfo />
        <div>
          <Outlet />
        </div>
      </UserContextProvider>
    </div>
  );
};
