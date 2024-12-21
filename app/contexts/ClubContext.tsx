// contexts/ClubContext.tsx
import { createContext, useState, useContext } from "react";

type ClubContextType = {
  selectedClub: string;
  setSelectedClub: (club: string) => void;
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedClub, setSelectedClub] = useState("Kulüp A"); // Varsayılan kulüp

  return (
    <ClubContext.Provider value={{ selectedClub, setSelectedClub }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error("useClub must be used within a ClubProvider");
  }
  return context;
};
