import React, { useState, useContext, useEffect, useRef } from 'react';
import AppContext from '../context/authcontext';
import { io, Socket } from 'socket.io-client';



const Chatbox: React.FC = () => {

    const appxon = useContext(AppContext);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);


    interface Message {
        MessageId: Number;
        senderID: string;
        recieverID : string ;
        MessageString: string;
    }
 

    const [messages, setMessages] = useState<Message[]>([]);
    const [targetMessage, settargetMessage] = useState<string>("");

    // ******************* LoggedIn User and Bsitter **************
    const storedB_id = localStorage.getItem('b_id');
    const storedP_id = localStorage.getItem('dataSender');
    const stroedB_name = localStorage.getItem('b_name');
    const storedP_name = localStorage.getItem('P_name');

    // ******************* conversationId (same) ****************
    const stored_P_Cid = localStorage.getItem('conversationID')
    const stored_B_Cid = localStorage.getItem('BconversationID')

    const strored_P_reciver = localStorage.getItem('selectedBisitter')
    const strored_B_reciver  = localStorage.getItem('selector')


    const stored_reciever  = strored_B_reciver || strored_P_reciver
    const left_right = storedP_id || storedB_id
    const newCID = stored_P_Cid || stored_B_Cid

    // console.log("left_right -> " ,left_right)
    // console.log("stored_reciever -> " ,stored_reciever)

    // **************   Socket.io ***************

    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        // Initialize the socket connection
        const socketInstance = io('http://localhost:8000');
        setSocket(socketInstance);

        return () => {
            //for disconnecting when the component unmounts
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('addUser', left_right , stored_reciever);

            socket.on('getUsers', (users: any) => {
                console.log('active users => ', users);
            });

            socket.on('getMessage', (data: any) => {
                console.log('GetMessage data => ', data);


                const newMessage: Message = {
                    MessageId: data.MessageId,
                    senderID: data.senderID,
                    recieverID : data.recieverID,
                    MessageString: data.MessageString
                };

                setMessages((prevMessages) => [...prevMessages, newMessage]);
                // console.log('check if getmessage is added or not ' ,messages);
                
            });
        }
    }, [socket, left_right, stored_reciever, newCID]);

    const obtainMessages = async () => {
        console.log("the newCID -> ", newCID)
        if (newCID) {
            try {
                const response = await fetch("/messages/" + newCID, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (response) {
                    const get_all_messages = await response.json()
                    console.log("Server response:", get_all_messages);
                    if (get_all_messages.success === true) {
                        const newMessages = get_all_messages.messagefetch.map((messageItem: any) => ({
                            MessageId: messageItem.messageid,
                            senderID: messageItem.senderid,
                            recieverID : messageItem.receiverID,
                            MessageString: messageItem.messagestring
                        }));

                        setMessages(newMessages);
                        // console.log("server response for message array : ", messages);

                    }
                } else {
                    console.log("No messages yet ")
                }
            } catch (error) {
                console.log("error fetching message : ", error)
            }
        } else {
            console.log("Conversation Id not present ");
        }
    }


    const handleSendMessage = async () => {

        if (newCID) {

            try {
                const response = await fetch("/message", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        consversationID: newCID,
                        senderID: left_right,
                        receiverID : stored_reciever,
                        MessageString: targetMessage
                    }),
                });

                if (response) {
                    const ck_success = await response.json();
                    console.log("Message send success -> ", ck_success.success);
                    
                    socket?.emit('sendMessage', {
                        
                        MessageId: ck_success.newConverstion[0].messageid,
                        senderID: left_right,
                        recieverID: stored_reciever ,
                        MessageString: targetMessage
                    })
                    obtainMessages();
                    settargetMessage('');
                } else {
                    console.error("Error sending message");
                }
            } catch (error) {
                console.error("Unable to send post request to /message", error);
            }
        } else {
            console.log("conversation key missing ");

        }
    };


    useEffect(() => {
        appxon?.obtainConversation();
    },
        [])
    useEffect(() => {

        obtainMessages();
    },
        [newCID])

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    return (
        <div>

            <div className="flex h-[75%] mt-16">
                <div className="flex h-[75%] mt-4 w-full">

                    <div className="md:w-3/4 p-4 flex flex-col bg-white w-[100%]">
                        
                        <div className=" flex flex-col md:flex-row  p-3 ">
                            <h2 className="text-3xl font-semibold">{stroedB_name || storedP_name}</h2>
                            <h6 className="md:block text-xl mt-1 p-1">{stored_reciever || strored_B_reciver}</h6>
                        </div>
                        <div className='flex flex-col items-center md:ml-56 mt-8'>

                            <div className="h-96  overflow-y-scroll p-4 md:w-[100%] w-[90%] shadow-xl mb-[4%] border-gray-200 border-2">
                                {messages && messages.length > 0 ? (
                                    messages.map((message ) => (
                                        <div
                                            key={message?.MessageId.toString()}
                                            className={`mb-4 ${message.senderID == left_right ? 'text-right' : 'text-left'}`}
                                        >
                                            <div
                                                className={`rounded-lg p-2 max-w-3/4 inline-block ${message.senderID == left_right ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                                    }`}
                                            >
                                                {message.MessageString}
                                            </div>
                                            <div ref={messageContainerRef}></div>
                                        </div>

                                    )
                                    )) : <div> No messages yet </div>}
                            </div>

                            <div className="flex w-[60%] shadow-lg rounded-lg">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-l-lg"
                                    placeholder="Type your message..."
                                    value={targetMessage}
                                    onChange={(e) => settargetMessage(e.target.value)}
                                />
                                <button
                                    className="  p-2 rounded-r-lg"
                                    onClick={handleSendMessage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 14l11 -11" />
                                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Chatbox
