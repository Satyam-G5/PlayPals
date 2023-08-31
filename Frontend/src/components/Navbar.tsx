import React from 'react'
import { Link } from 'react-router-dom';


const Navbar: React.FC= () => {
  return (
    <nav className="w-full h-20 bg-white fixed top-0 flex justify-between rounded-lg shadow-lg z-10">
      <div className="text-3xl text-black font-bold mt-5 ml-3 ">PlayPals</div>
      <div className="flex flex-row justify-end items-center mt-1 mr-2 md:hidden">
        <button
          className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950 focus:outline-none"
        //    
        >
          Menu
        </button>
      </div>
      <div className= "hidden md:flex md:flex-row md:justify-evenly md:mt-1 md:mr-2 ">
        <Link to="/" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Home
        </Link>
        <Link to="/hotels" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Baby Sitters
        </Link>
        <Link to="/guides" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Chat
        </Link>
        <Link to="/top-destination" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Status
        </Link>
      </div>
      
      <div className="mt-3.5 mr-2 justify-center">
        <div className="p-2 bg-gray-200 mr-4 rounded-lg hover:bg-gray-300 shadow-lg hover:cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y+1 hover:scale-105">
            Signup
        </div>
      </div>
    </nav>
  )
}

export default Navbar
