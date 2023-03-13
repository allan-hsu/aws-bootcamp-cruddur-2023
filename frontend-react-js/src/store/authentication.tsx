import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface IUserData {
    handle: string | null;
    username: string | null;
}

interface IAuthContext {
    user: IUserData;
    setUser?: Dispatch<SetStateAction<IUserData>>;
}
const defaultUserData: IUserData = {
    handle: null,
    username: null,
};
export const AuthContext = createContext<IAuthContext>({
    user: defaultUserData
});

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [authTokenState, setAuthTokenState] = useState(localStorage.getItem('access_token'));

    const setAuthToken = (accessToken: string) => {
        localStorage.setItem('access_token', accessToken);
        setAuthTokenState(accessToken);
    };

    return {
        user,
        setAuthToken,
        authToken: authTokenState,
        setUser
    }
};

interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUserData>(defaultUserData);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};