import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full h-20 bg-white fixed top-0 flex justify-between rounded-lg shadow-lg z-10">
      <div className="text-3xl font-bold mt-5 ml-3">
        <span className="text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text">PlayPals</span>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex flex-col items-center mt-1 mr-2 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-xl text-gray-600 p-5 flex flex-row hover:cursor-pointer hover:text-gray-950 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col rounded-md items-center bg-red-600 ">
          <Link to="/Members" className="text-xl text-white bg-red-600 p-6 hover:cursor-pointer hover:text-gray-950">
            Members
          </Link>
          <Link to="/booked_status" className="text-xl text-white bg-red-600 p-6 hover:cursor-pointer hover:text-gray-950">
            Status
            </Link>
          <Link to="/Bchat" className="text-xl text-white bg-red-600 p-6 hover:cursor-pointer hover:text-gray-950">
            Chat
          </Link>
        </div>
      )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:flex-row md:justify-evenly md:mt-1 md:mr-2 ">
        <Link to="/Members" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Dashboard
        </Link>
        <Link to="/booked_status" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
        Status
        </Link>
        <Link to="/Bchat" className="text-xl text-gray-600 p-6 hover:cursor-pointer hover:text-gray-950">
          Chat
        </Link>
      </div>

      <div className="mt-3.5 mr-2 justify-center">
        <Link to="/BsignIn">
          <div className="p-2 bg-red-500 mr-4 rounded-lg hover:bg-red-700 text-white shadow-lg hover:cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y+1 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
