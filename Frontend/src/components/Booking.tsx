
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/authcontext';

interface Babysitter {
  name: string;
  age: number;
  gender: string;
  image: string;
  phone_no: number;
  exp_hrs: string;
  description: string;
  email: string;
}

const Booking: React.FC = () => {
  const appxon = useContext(AppContext);

  const [babysitters, setBabysitters] = useState<Babysitter[]>([]);
  // const [conversationID , setConversationID] = useState<number | undefined>()

  // useEffect(() => {
  //   if (conversationID !== undefined ){
  //     localStorage.setItem('conversationID' , JSON.stringify(conversationID))
  // }
  // } , [conversationID])

  const fetchallBsitters = async () => {
    try {
      const response = await fetch( "https://playpals.onrender.com" + "/get_all_bsitter");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("The Fetched data of all employees : ", data);

      if (Array.isArray(data.all_employee_details)) {
        setBabysitters(data.all_employee_details);
      } else {
        console.error("Data.all_employee_details is not an array:", data.all_employee_details);
      }
    } catch (error) {
      console.error("Error fetching babysitters:", error);
    }
  };

  useEffect(() => {
    fetchallBsitters();
  }, []);

  const [gotuser, setgotUser] = useState({
    address: '',
    child_age: 0,
    child_name: '',
    email: '',
    gender: '',
    name: '',
    password: '',
    phone_no: 0,
  });

  const storednewUser = localStorage.getItem('newuser');

  useEffect(() => {
    if (storednewUser !== null) {
      const parsedUser = JSON.parse(storednewUser);
      setgotUser(parsedUser);
    }
  }, []);

  const createConversation = async (id: string) => {
    if (gotuser.email && id) {
      console.log("RecieverID from appcontext : ", id)
      console.log("SenderID from appcontext : ", gotuser.email)
      try {

        const response = await fetch( "https://playpals.onrender.com" + "/conversation", {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            SenderID: gotuser.email,
            RecieverID: id
          })
        })
        if (response) {
          const C_ID = await response.json();
          console.log("ConversationID created ", C_ID.consversationid);
          localStorage.setItem('conversationID' , JSON.stringify(C_ID.consversationid))

        }
        else {
          console.log("SenderID or RecieverID not Found ")
        }

      } catch (error) {
        console.log("ConversationID not created : ", error)
      }

    } else {
      console.log("ReciversID not set : ", id)
      console.log("SenderID not set : ", gotuser.email)
    }
  }

  const handleBookClick = (id: string, name: string) => {
    console.log("ID :", id);
    console.log("local storage email ", gotuser.email);
    localStorage.setItem('b_name', name);
    if (gotuser.email && id) {
      appxon?.selectBsitter(id);
      createConversation(id);
      console.log(`Book babysitter with ID ${id}`);
    } else {
      console.error('Invalid email or id');
    }
  };


  return (

    <div className="flex flex-col space-y-4 mt-12">
      {babysitters.length === 0 ? (
        <p className='text-xl text-black text-semibold mt-10 text-center'>No babysitters available</p>
      ) : (
        babysitters.map((babysitter) => (
          <div className="lg:flex lg:items-center lg:justify-between p-5 shadow-md md:ml-10 mt-12 w-[90%] ">
            <div className="min-w-0 flex-1">
              <div className='flex flex-row'>
                <img src={babysitter.image} alt={babysitter.name} className="w-14 h-16 rounded-full" />
                <h2 className="text-2xl ml-3 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{babysitter.name}</h2>
              </div>
              <div className='md:w-[70%] mt-2 '>
                {babysitter.description}
              </div>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clipRule="evenodd" />
                    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                  </svg>
                  {babysitter.age} years
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 icon icon-tabler icon-tabler-user" width="14" height="14" viewBox="0 0 20 20" stroke-width="3" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  {babysitter.gender}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                  </svg>
                  ${babysitter.exp_hrs}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                  {babysitter.email}
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">


              <span className="sm:ml-3 md:ml-4">
                <Link to="/booked">
                  <button onClick={() => handleBookClick(babysitter.email, babysitter.name)} type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    Book
                  </button>
                </Link>
              </span>
            </div>
          </div>
        ))
      )}

    </div>


    // <div classNameName="flex flex-col space-y-4 mt-12">
    //   {babysitters.length === 0 ? (
    //     <p>No babysitters available</p>
    //   ) : (
    //     babysitters.map((babysitter) => (
    //       <div key={babysitter.email} classNameName="flex items-center space-x-4 p-4 border">
    //         <img src={babysitter.image} alt={babysitter.name} classNameName="w-16 h-16 rounded-full" />
    //         <div>
    //           <h2 classNameName="text-lg font-semibold">{babysitter.name}</h2>
    //           {/* Display additional details here */}
    //         </div>
    //         <button
    //           onClick={() => handleBookClick(babysitter.email)}
    //           classNameName="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //         >
    //           Book
    //         </button>
    //       </div>
    //     ))
    //   )}
    // </div>
  );
};

export default Booking;


