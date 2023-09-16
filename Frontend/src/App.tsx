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

import { AppProvider } from "./context/authcontext"


function App() {


  return (
    <>
      <AppProvider>
        <Router>
          <div className='w-screen'>
            <Routes>
              <Route path="/" element={<><SingIn /></>} />
              <Route path="/register_user" element={<><Register /></>} />
              <Route path="/dashboard" element={<><Navbar/><Dashboard /></>} />
              <Route path="/BsignIn" element={<><BSignIn/></>} />
              <Route path="/register" element={<><Bregister/></>} />
              <Route path="/Members" element={<><Members/></>} />
              <Route path="/book_bsitter" element={<><Navbar/><Booking/></>}/>
            </Routes>
          </div>

        </Router>
      </AppProvider>
    </>
  )
}

export default App
