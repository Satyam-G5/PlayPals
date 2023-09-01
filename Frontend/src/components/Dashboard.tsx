import { useContext, useState, useEffect } from 'react'
import AppContext from '../context/authcontext'

const Dashboard: React.FC = () => {
  const appContext = useContext(AppContext);

  const [gotuser, setgotUser] = useState({
    address: "",
    child_age: 0,
    child_name: "",
    email: "",
    gender: "",
    name: "",
    password: "",
    phone_no: 0,
  });

  useEffect(() => {
    if (appContext?.newuser) {
      setgotUser(appContext.newuser);
    }
  }, [appContext?.newuser]);

  return (
    <div className="bg-gray-100 h-screen ">
      <div className='flex flex-row justify-between rounded-lg mr-2 h-24 top-28 fixed w-screen'
      style={{
        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
      }}>
        <div className=" text-white p-6 text-3xl font-bold h-24">
          DASHBOARD
        </div>
        <div className=" text-white p-6 text-3xl font-bold mr-4">
          {gotuser.name}
        </div>
      </div>
      <div className="mx-auto max-w-8xl py-12 px-4 sm:px-6 lg:px-8 shadow-gray-500 rounded-2xl ">
        <div className="bg-white overflow-hidden text-4xl text-black shadow sm:rounded-lg mt-48 p-4 flex flex:flex-row ">
        <p className='font-bold'>{gotuser.child_name} </p> <p className='text-sm mt-3 font-bold p-2'> {gotuser.child_age}years </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
