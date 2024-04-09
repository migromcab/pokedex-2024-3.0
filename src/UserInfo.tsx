import { ChangeEvent, useContext, useState } from 'react';
import { UserContext } from './contexts/UserContextProvider';

export const UserInfo = () => {
  const [name, setName] = useState('');
  const { isSignedIn, username, signIn } = useContext(UserContext);

  const handleSignIn = () => {
    signIn(name);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="mb-2">
      {isSignedIn ? (
        <strong>{username}</strong>
      ) : (
        <>
          <input placeholder="Tu nombre de entrenador/a/e" max={15} onChange={handleNameChange} value={name} />
          <button onClick={handleSignIn}>Iniciar sesión</button>
        </>
      )}
    </div>
  );
};
