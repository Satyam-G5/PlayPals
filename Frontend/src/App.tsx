import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from "./components/Navbar"
import SingIn from "./components/SignIn";
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Navbar from './components/Navbar';
import BSignIn from './components/BSignIn';
import Bregister from './components/Bregister';
import Members from './components/Members';
import Booking from './components/Booking';
import Chatbox from './components/Chatbox';
import Selection from './components/Selection';
import BookingStatus from './components/Booking_status';
import B_Nav from './components/B_Nav';

import { AppProvider as UserAppProvider } from "./context/authcontext"
import { AppProvider as BAuthAppProvider  } from "./context/bauth"


function App() {


  return (
    <>
       <UserAppProvider>
        <BAuthAppProvider>
        <Router>
          <div className='w-screen'>
            <Routes>
              <Route path="/" element={<><SingIn /></>} />
              <Route path="/register_user" element={<><Register /></>} />
              <Route path="/dashboard" element={<><Navbar/><Dashboard /></>} />
              <Route path="/BsignIn" element={<><BSignIn/></>} />
              <Route path="/register" element={<><Bregister/></>} />
              <Route path="/Members" element={<><B_Nav/><Members/></>} />
              <Route path="/book_bsitter" element={<><Navbar/><Booking/></>}/>
              <Route path="/chat" element={<><Navbar/><Chatbox/></>}/>
              <Route path="/Bchat" element={<><B_Nav/><Chatbox/></>}/>
              <Route path="/booked" element={<><Navbar/><Selection/></>}/>
              <Route path="/booked_status" element={<><B_Nav/><BookingStatus/></>}/>
            </Routes>
          </div>

        </Router>
        </BAuthAppProvider>
      </UserAppProvider>
    </>
  )
}

export default App
