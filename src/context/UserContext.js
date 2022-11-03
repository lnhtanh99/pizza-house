import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [currentUserID, setCurrentUserID] = useState('');
    const [currentUser, setCurrentUser] = useState({});

    return (
        <UserContext.Provider 
            value={{ 
                currentUserID,
                setCurrentUserID,
                currentUser,
                setCurrentUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
