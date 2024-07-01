import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// UserContextProvider component
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
