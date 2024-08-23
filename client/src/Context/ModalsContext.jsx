import { createContext, useContext, useState } from "react";

const ModalsContext = createContext();
function ModalsContextProvider({ children }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        isBookingModalOpen,
        setIsBookingModalOpen,
        isAddReviewModalOpen,
        setIsAddReviewModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        isTourModalOpen,
        setIsTourModalOpen,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}

function UseModalsContext() {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error("This context is used outside the context provider tag");
  }
  return context;
}

export { ModalsContextProvider, UseModalsContext };
