'use client'; // Solo si usas App Router

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define el tipo del contexto
type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// 2. Crea el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Crea el proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <UserContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Custom hook para acceder fácilmente al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};
