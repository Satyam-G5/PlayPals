import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookingStatus: React.FC = () => {
    interface BookingData {
        address: string;
        child_age: number;
        child_name: string;
        email: string;
        gender: string;
        name: string;
        password: string;
        phone_no: number;
    }

    const [senderId, setSenderId] = useState<string | null>(null);
    const [bookingData, setBookingData] = useState<BookingData | undefined>(undefined);
    const [bid , setBid] = useState<string>()

    useEffect(()=>{
      const b_id = localStorage.getItem('b_id')
       if(b_id !== null) {
        setBid(b_id)
       }
    }, [])

    useEffect(() =>{
        localStorage.setItem('P_name' , JSON.stringify(bookingData?.name))
    } , [bookingData])

    useEffect(() => {
        const d_storedSenderId :any = localStorage.getItem('selector');
        const parsedSenderId = JSON.parse(d_storedSenderId)
        if (parsedSenderId !== null) {
            setSenderId(parsedSenderId);
        }
    }, []);

    useEffect(() => {
        if (senderId) {
            fetchData();
        }
    }, [senderId]);

    const fetchData = async () => {
        try {
            if (!senderId) {
                return; // Exit early if senderId is null
                console.log("SenderID not found");
                
            }
            console.log("SenderId is present : " , senderId);
            
            
            const response = await fetch("/get_user/"+senderId,{
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                }
            });
            console.log("Parent request send successfully : " ,senderId);
            
            if (response) {
                const user_details = await response.json();
                console.log(user_details);
                setBookingData({
                    address: user_details.all_employee.address,
                    child_age: user_details.all_employee.child_age,
                    child_name: user_details.all_employee.child_name,
                    email: user_details.all_employee.email,
                    gender: user_details.all_employee.gender,
                    name: user_details.all_employee.name,
                    password: user_details.all_employee.password,
                    phone_no: user_details.all_employee.phone_no
                });
            } else {
                console.log("Response not received");
            }
        } catch (error) {
            console.log("Error Notice", error);
        }
    };

    const handleBookingCompletion = async () => {
        try {
            const response = await fetch('/delete_conver/'+bid,{
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            });
            if (response) {
                console.log('Booking deleted successfully');
                localStorage.setItem('selector' , JSON.stringify(null))
                localStorage.setItem('b_id' , JSON.stringify(null))
                localStorage.setItem('BconversationID' , JSON.stringify(null))
            } else {
                console.error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    if (!senderId) {
        return <p>Loading...</p>; // Render loading indicator while senderId is being fetched
    }

    return (
        <div>
            {bookingData !== undefined ? (
                <div>
                    <div className="bg-white p-2 mt-52 md:ml-96 border-4 md:border-gray-700 md:mt-32 shadow-md rounded-md w-full sm:w-[40%] sm:mb-4">
                        <h2 className="text-xl text-center font-semibold mb-2">Booking status</h2>
                        <p className="text-gray-600">
                            <p>Booker Name: {bookingData.name}</p>
                            <p>Child Name: {bookingData.child_name}</p>
                            <p>Child Age: {bookingData.child_age}</p>
                            <p>Child Gender: {bookingData.gender}</p>
                            <p>Email ID: {bookingData.email}</p>
                            <p>Phone No: {bookingData.phone_no}</p>
                            <Link to="/Members">
                            <button className="ml-24 md:ml-52 w-32 text-white text-center py-2 px-4 mt-4 rounded-md" onClick={handleBookingCompletion} style={{
                                background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}>
                                Job Complete
                            </button>
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <h1 className='text-3xl text-center mt-96'>Please Wait , we will contact you soon .... 
                <button className="ml-24 md:ml-52 w-32 text-white text-center py-2 px-4 mt-4 rounded-md" style={{
                                background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}>
                                <Link to="/Members">
                                Back
                                </Link>
                            </button></h1>
            )}
        </div>
    );
};

export default BookingStatus;
