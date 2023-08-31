import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
interface AppContextType {
    loginState: boolean | undefined;
    token: string | undefined;
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
    const [user, setUser] = useState<userType>({
        address  : "" ,
        child_age : 0 ,
       child_name : "" ,
        email : "" ,
        gender : "" ,
        name : "" ,
        password : "" ,
        phone_no : 0
    })

    const changeLoginState = (login: boolean) => {
        setLoginState(login);
    };

    const changeToken = (newtoken: string) => {
        setToken(newtoken);
    };
    const getuser_details = async () => {
        if (token) {
            try {
                const {address , child_age , child_name , email , gender , name , password , phone_no} = user

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
                    console.log(user_details);
                    setUser({...user_details , address , child_age , child_name , email , gender , name , password , phone_no })
                    console.log("Name is " , user.name)
                    console.log("Child Name is " , user.child_name)
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
        changeLoginState,
        changeToken,
        getuser_details
    };

    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>;
};

export default AppContext;
