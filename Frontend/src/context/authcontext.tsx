import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
interface AppContextType {
    loginState: boolean | undefined;
    token: string | undefined;
    newuser : any ;
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
        address  : string; 
        child_age : Number ;
       child_name : string ; 
        email : string ; 
        gender : string ; 
        name : string ; 
        password : string ; 
        phone_no : number ;
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
                

                const response = await fetch("user_details", {
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
                        address: user_details.user.address,
                        child_age: user_details.user.child_age,
                        child_name: user_details.user.child_name,
                        email: user_details.user.email,
                        gender: user_details.user.gender,
                        name: user_details.user.name,
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
