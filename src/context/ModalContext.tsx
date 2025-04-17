import { createContext, useContext, useState, ReactNode } from "react";

type ModalState = {
    [key: string]: boolean; // Estado de cada modal identificado por un ID
};

type ModalContextType = {
    modals: ModalState;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    toggleModal: (id: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalState>({});

    const openModal = (id: string) => setModals((prev) => ({ ...prev, [id]: true }));
    const closeModal = (id: string) => setModals((prev) => ({ ...prev, [id]: false }));
    const toggleModal = (id: string) =>
        setModals((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext debe usarse dentro de un ModalProvider");
    }
    return context;
};