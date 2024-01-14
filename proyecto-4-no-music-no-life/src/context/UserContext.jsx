import { createContext, useState } from "react";

// estado de usuario
export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState()

    return(

        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>

    )
}

export default UserProvider