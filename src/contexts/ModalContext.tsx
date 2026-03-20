import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context with initial value as undefined
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<ModalState>({
        Inventory: false
    });

    const showModal = (modalKey: keyof ModalState) => {
        setModals((prevModals) => ({
            ...prevModals,
            [modalKey]: true,
        }));
    };

    const hideModal = (modalKey: keyof ModalState) => {
        setModals((prevModals) => ({
            ...prevModals,
            [modalKey]: false,
        }));
    };

    const toggleModal = (modalKey: keyof ModalState) => {
        setModals((prevModals) => ({
            ...prevModals,
            [modalKey]: !prevModals[modalKey],
        }));
    };

    // Provide the context value
    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to use the ModalContext
export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};