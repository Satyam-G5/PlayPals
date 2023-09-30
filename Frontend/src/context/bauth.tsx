import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
interface AppContextType {
    loginState: boolean | undefined;
    Btoken: string | undefined;
    Bnewuser: any;
    b_id: string | undefined;
    BconversationID: Number | undefined;
    selector : string | undefined ;
    changeLoginState: (login: boolean) => void;
    BobtainConversation : () =>void ;
    changeBtoken: (newBtoken: string) => void;
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
        description : string ;
        email: string;
        password: string;
    }


    const [loginState, setLoginState] = useState<boolean | undefined>();
    const [Btoken, setBtoken] = useState<string | undefined>();
    const [Bnewuser, setBNewuser] = useState<userType>();
    const [b_id, setB_id] = useState<string>();
    const [BconversationID , setBconversationID] = useState<Number | undefined> ()
    const [selector , setselector] = useState<string | undefined > ()



    const changeLoginState = (login: boolean) => {
        setLoginState(login);
    };

    const changeBtoken = (newBtoken: string) => {
        setBtoken(newBtoken);
    };
    const getuser_details = async () => {
        if (Btoken) {
            try {


                const response = await fetch("bsitter_details", {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        "Authorization": `${Btoken}`
                    }
                })
                if (response.ok) {
                    const user_details = await response.json();
                    console.log(user_details.user);
                    setBNewuser(prevUser => ({
                        ...prevUser,
                        name: user_details.user.name,
                        age: user_details.user.age,
                        gender: user_details.user.gender,
                        image: user_details.user.image,
                        exp_hrs: user_details.user.exp_hrs,
                        email: user_details.user.email,
                        description : user_details.user.description,
                        password: user_details.user.password,
                        phone_no: user_details.user.phone_no
                    }));
                    setB_id(user_details.user.email);
                    // localStorage.setItem('Image' , JSON.stringify(user))

                    
                }
                else {
                    console.log("response not recieved ")
                }

            } catch (error) {
                console.log("error Notice", error)
            }
        }
    }

    const BobtainConversation = async () => {
        try {
            if (b_id) {
                const response = await fetch('/conversations/' + b_id, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                console.log("Fetch request send successfully : ", b_id)

                if (response) {
                    const C_ID = await response.json();
                    console.log("BconversationID fetched : ", C_ID.ConversationMember.consversationid);
                    setBconversationID(C_ID.ConversationMember.consversationid)
                    setselector(C_ID.ConversationMember.senderid)
                }
                else {
                    console.log("Conversation not Present  ")
                }
            } else {
                console.log("Conversation id not fetched as b_id not defined", b_id)
            }
        } catch (error) {
            console.log("error fetching the conversation Notice", error)
        }
    }

    useEffect(() => {
        BobtainConversation()
    }, [b_id])

    useEffect(() => {
        getuser_details();

    }, [Btoken])

    useEffect(() => {  /// take care of the login-user and Btoken storage 
        if (Bnewuser) {
            localStorage.setItem('Bnewuser', JSON.stringify(Bnewuser));
        }
        if (Btoken !== undefined) {
            localStorage.setItem('Btoken', JSON.stringify(Btoken));
        }
        if (b_id !== undefined) {
            localStorage.setItem('b_id', JSON.stringify(b_id));
        }
    }, [Bnewuser , Btoken , b_id]);

    useEffect(() => {/// storing BconversationID and selector (form obtainconversation )
        if (selector !== undefined ){
            localStorage.setItem('selector' , JSON.stringify(selector))
        }
        if (BconversationID !== undefined ){
            localStorage.setItem('BconversationID' , JSON.stringify(BconversationID))
        }
    }, [selector , BconversationID])

    const contextValue: AppContextType = {
        loginState,
        Btoken,
        Bnewuser,
        b_id,
        BconversationID,
        selector,
        BobtainConversation,
        changeLoginState,
        changeBtoken,
        getuser_details
    };

    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>;
};

export default AppContext;
