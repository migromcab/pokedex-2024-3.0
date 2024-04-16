import { ReactNode, createContext, useState } from 'react';

interface UserContextModel {
  username?: string;
  signIn: (username: string) => void;
  isSignedIn: boolean;
}

const context: UserContextModel = {
  signIn: () => {
    return;
  },
  isSignedIn: false
};

export const UserContext = createContext<UserContextModel>(context);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps): JSX.Element | null => {
  const [username, setUsername] = useState<string>();

  const contextValue = {
    username,
    signIn: setUsername,
    isSignedIn: Boolean(username)
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
