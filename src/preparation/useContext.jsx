import { createContext, useState } from "react";

const ModalWindowContext = createContext({
    isShow: false,
    open: () => {},
    close: () => {}
})

const ModalWindowProvider = ({children}) => {
    const [isShow, setIsShow] = useState(false);
    const open = () => setIsShow(true);
    const close = () => setIsShow(false);
    
    return (
        <ModalWindowContext.Provider value={{isShow, open, close}}>
            {children}
        </ModalWindowContext.Provider>
    );
};

export {ModalWindowContext, ModalWindowProvider};