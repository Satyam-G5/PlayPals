import { useState, useEffect, useContext  } from 'react'
import { Link } from 'react-router-dom'
import Appcontext from '../context/bauth'

const Members: React.FC = () => {
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
  const bauth = useContext(Appcontext)
  
  const [gotuser, setgotUser] = useState<Babysitter | undefined>();
  useEffect(() => {
    setgotUser(bauth?.Bnewuser)
  } , [bauth?.Bnewuser])
  
  useEffect(() => {
    const storednewUser = localStorage.getItem('Bnewuser');
    if (storednewUser !== null) {
      const parsedUser = JSON.parse(storednewUser);
      setgotUser(parsedUser);
    }
  }, []);

  const storeConversationID = localStorage.getItem('BconversationID')

  return (
    <div className=" mt-20 h-screen">
      <div className=''>
        <div className='flex flex-col'>
          <div className='relative md:h-64'>
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0bedb362-1325-47fe-8fb8-8a1224de0221/de4ypgv-9f9c809c-12ee-4cfb-aca8-e9324c973bc8.png/v1/fill/w_1280,h_427,q_80,strp/fall_twitter_header_by_sailortrekkie92_de4ypgv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDI3IiwicGF0aCI6IlwvZlwvMGJlZGIzNjItMTMyNS00N2ZlLThmYjgtOGExMjI0ZGUwMjIxXC9kZTR5cGd2LTlmOWM4MDljLTEyZWUtNGNmYi1hY2E4LWU5MzI0Yzk3M2JjOC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QEHQ3QilHa1vysNTvSSo11ak8__2txwkHztOj3JCZGc"
              alt="Alternate Image"
              className='absolute top-0 left-0  object-cover md:h-72 w-full' // Adjust this line
            />
            <img
              src={gotuser?.image}
              alt={gotuser?.name}
              className="md:w-36 md:h-36 h-24 w-24 top-20 rounded-full lg:top-52 lg:w-48 lg:h-48 lg:left-16 absolute md:top-56 border-4 md:border-8 border-white left-4 object-cover"
            />
            <h1 className='absolute left-32 text-black text-xl top-32 lg:top-72 text-bold md:text-4xl md:left-72 md:top-72 md:mt-4'>{gotuser?.name}</h1>
          </div>
        </div>

        <div className='p-2 mt-44 md:mt-32 md:ml-8'>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-gender-bigender" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 11m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M19 3l-5 5" />
              <path d="M15 3h4v4" />
              <path d="M11 16v6" />
              <path d="M8 19h6" />
            </svg>
            {gotuser?.gender}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-mail-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" stroke-width="0" fill="currentColor" />
              <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" stroke-width="0" fill="currentColor" />
            </svg>
            {gotuser?.email}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-phone-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" stroke-width="0" fill="currentColor" />
            </svg>
            {gotuser?.phone_no}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-face-id" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
              <path d="M9 10l.01 0" />
              <path d="M15 10l.01 0" />
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
            </svg>
            {gotuser?.description}
          </div>


          <div className="flex flex-col justify-evenly sm:flex-row mt-4">
        <div className="bg-white shadow-md rounded-md p-4 w-full sm:mb-4 sm:w-[40%]">
          <h2 className="text-xl text-center font-semibold mb-4">Booked Status</h2>
          <p className="text-gray-600">
            Check your booking Status here . Any booking status and other necessary details are send to you be email .Please be polite with the customer. Take all neccessary precautions for kid.
          </p>
            {storeConversationID || bauth?.BconversationID ? (<Link to="/booked_status">
            <button className="ml-24 md:ml-52 w-32 text-white text-center py-2 px-4 mt-4 rounded-md"style={{
                background:
                  'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
              }}>
              Booked
            </button>
          </Link>) : (<button className="ml-24 md:ml-52 w-32 bg-gray-500 text-white text-center py-2 px-4 mt-4 rounded-md">
              Waiting
            </button>
            )}
          
        </div>

        <div className="bg-white shadow-md rounded-md p-4 w-full sm:w-[40%] sm:mb-4">
          <h2 className="text-xl text-center font-semibold mb-2">Chat with Parents</h2>
          <p className="text-gray-600">
            Chat with Parents in real-time . Try to respond as soon as possible , give necessary information only , try to keep in simple and to the point . Chat with parents for any prior preparations .
          </p>
          {storeConversationID || bauth?.BconversationID ? (<Link to="/Bchat">
            <button className=" text-white w-32 py-2 ml-24 md:ml-52 px-4 mt-4 rounded-md"style={{
          background:
            'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
        }}>
              Chat Now
            </button>
          </Link>) : (<button className="ml-24 md:ml-52 w-32 bg-gray-500 text-white text-center py-2 px-4 mt-4 rounded-md">
              Wait
            </button>
            )}
        </div>
      </div>

        </div>
      </div>
    </div>
  );

}

export default Members
