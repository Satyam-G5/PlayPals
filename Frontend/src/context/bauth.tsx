import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
interface AppContextType {
    loginState: boolean | undefined;
    token: string | undefined;
    newuser: any;
    changeLoginState: (login: boolean) => void;
    changeToken: (newtoken: string) => void;
    getuser_details: () => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    interface userType {
        name: string;
        age: string;
        gender: string;
        image: string;
        phone_no: string;
        exp_hrs: string;
        email: string;
        password: string;
    }


    const [loginState, setLoginState] = useState<boolean | undefined>();
    const [token, setToken] = useState<string | undefined>();
    const [newuser, setNewuser] = useState<userType>()

    const changeLoginState = (login: boolean) => {
        setLoginState(login);
    };

    const changeToken = (newtoken: string) => {
        setToken(newtoken);
    };
    const getuser_details = async () => {
        if (token) {
            try {


                const response = await fetch("bsitter_details", {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        "Authorization": `${token}`
                    }
                })
                if (response.ok) {
                    const user_details = await response.json();
                    console.log(user_details.user);
                    setNewuser(prevUser => ({
                        ...prevUser,
                        name: user_details.user.name,
                        age: user_details.user.age,
                        gender: user_details.user.gender,
                        image: user_details.user.image,
                        exp_hrs: user_details.user.exp_hrs,
                        email: user_details.user.email,
                        password: user_details.user.password,
                        phone_no: user_details.user.phone_no
                    }));
                }
                else {
                    console.log("response not recieved ")
                }

            } catch (error) {
                console.log("error Notice", error)
            }
        }
    }

    useEffect(() => {
        getuser_details();

    }, [token])


    const contextValue: AppContextType = {
        loginState,
        token,
        newuser,
        changeLoginState,
        changeToken,
        getuser_details
    };

    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>;
};

export default AppContext;
