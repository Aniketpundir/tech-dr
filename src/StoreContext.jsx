import { createContext } from "react";

export const MyContext = createContext();

import { useState } from "react";

export const MyProvider = ({ children }) => {
    const [user, setUser] = useState("Home");
    console.log(user)

    return (
        <MyContext.Provider value={{ user, setUser }}>
            {children}
        </MyContext.Provider>
    );
};