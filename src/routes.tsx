import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PokemonList } from './PokemonList';
import { PokemonDetails } from './PokemonDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PokemonList />
      },
      {
        path: '/pokemon/:pokemonId',
        element: <PokemonDetails />
      },
      {
        path: '/terms-and-conditions',
        element: <div>Términos y condiciones</div>
      },
      {
        path: '/privacy',
        element: <div>Privacy</div>
      },
      {
        path: '/sign-up',
        element: <div>Sign-up</div>
      }
    ]
  }
]);
