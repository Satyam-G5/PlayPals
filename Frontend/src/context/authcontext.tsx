import React, { createContext, useState, ReactNode, useEffect  } from 'react';


// Define the context type
interface AppContextType {
    loginState: boolean | undefined;
    token: string | undefined;
    newuser : any ;
    selectedBsitter : string | undefined ;
    chatPresent: boolean | undefined;
    conversationID: Number | undefined;
    booked:boolean ;
    dataSender : string | undefined ;
    changeconversationID: (stateID : number) => void;
    changePresentState: (login: boolean) => void;
    createConversation: () => void;
    obtainConversation: () => void;
    selectBsitter :(email : string) => void ;
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
    // interface conMem {
    //        cID : string ;
    //     SenderID : string ;
    //     RecieverID : string ;
    // }

    const [loginState, setLoginState] = useState<boolean | undefined>();
    const [token, setToken] = useState<string | undefined>();
    const [newuser, setNewuser] = useState<userType>()
    const [selectedBsitter , setSelectedBsitter] = useState<string | undefined>()
    const [chatPresent , setChatPresent] = useState<boolean | undefined >()
    const [conversationID , setConversationID] = useState<Number | undefined> ()
    const [booked , setBooked] = useState<boolean>(false)
   

    const [dataSender , setDataSender] = useState<string>()


    const changeconversationID = (value : Number) => {
        setConversationID(value);
    }
    const changePresentState = (val : boolean) => {
        setChatPresent(val);
    }

    const selectBsitter = (email : string) => {
        setSelectedBsitter(email);
        console.log("Baby sitter set succesfully")
    }
    const changeLoginState = (login: boolean) => {
        setLoginState(login);
    };

    const changeToken = (newtoken: string) => {
        setToken(newtoken);
    };

    const getuser_details = async () => {
        if (token) {
            try {
                

                const response = await fetch( "https://playpals.onrender.com" + "/user_details", {
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
                    setDataSender(user_details.user.email)             
                }
                else {
                    console.log("response not recieved ")
                }
                
            } catch (error) {
                console.log("error Notice", error)
            }
        }
    }

    const createConversation = async () => {
        if (dataSender && selectedBsitter){
            console.log("RecieverID from appcontext : " , selectedBsitter)
            console.log("SenderID from appcontext : " , dataSender)
            try {
                
                const response = await fetch( "https://playpals.onrender.com" + "/conversation", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        SenderID: dataSender,
                        RecieverID: selectedBsitter
                      })
                }) 
                if (response) {
                    const C_ID = await response.json();
                    console.log("ConversationID created ",C_ID.consversationid);
                    setBooked(true)
                }
                else {
                    console.log("SenderID or RecieverID not Found ")
                }
                
            } catch (error) {
                console.log("ConversationID not created : ", error)
            }
        
        }else{
          console.log("ReciversID not set : " , selectedBsitter)  
          console.log("SenderID not set : " , dataSender)  
        }
    }

    const obtainConversation = async () => {
            try {
                if (dataSender){
                    const response = await fetch( "https://playpals.onrender.com" + '/conversations/'+dataSender,{
                        method: "GET",
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    console.log("Fetch request send successfully : " ,dataSender)
    
                    if (response) {
                        const C_ID = await response.json();
                        console.log("ConversationID fetched : " ,C_ID.ConversationMember.consversationid);   
                        setConversationID(C_ID.ConversationMember.consversationid)    
                        setSelectedBsitter(C_ID.ConversationMember.recieverid)
                        setBooked(true)
                    }
                    else {
                        console.log("Conversation not Present  ")
                    }

                }else{
                    console.log("Conversation id not fetched as dataSender not defined in Authcontext" , dataSender)
                }

                
            } catch (error) {
                console.log("error fetching the conversation Notice", error)
            }
    }
    useEffect(()=>{
        obtainConversation()
    }, [dataSender])

    useEffect(() => {
        getuser_details();
       
    }, [token]);

    useEffect(() => {  /// take care of the login-user and token storage 
        if (newuser) {
            localStorage.setItem('newuser', JSON.stringify(newuser));
        }
        if (token !== undefined) {
            localStorage.setItem('token', JSON.stringify(token));
        }
        if (dataSender !== undefined) {
            localStorage.setItem('dataSender', JSON.stringify(dataSender));
        }
    }, [newuser , token , dataSender]);

    useEffect(() => {/// storing conversationID and selected Bitter (form )
        if (selectedBsitter !== undefined ){
            localStorage.setItem('selectedBisitter' , JSON.stringify(selectedBsitter))
        }
        if (conversationID !== undefined ){
            localStorage.setItem('conversationID' , JSON.stringify(conversationID))
        }
    }, [selectedBsitter , conversationID])



    const contextValue: AppContextType = {
        loginState,
        token,
        newuser,
        selectedBsitter,
        chatPresent,
        conversationID,
        booked ,
        dataSender,
        changePresentState,
        changeconversationID,
        createConversation,
        obtainConversation,
        changeLoginState,
        changeToken,
        getuser_details,
        selectBsitter
    };

    return <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>;
};

export default AppContext;
