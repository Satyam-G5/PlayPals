import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from "./components/Navbar"
import SingIn from "./components/SignIn";
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Navbar from './components/Navbar';

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
            </Routes>
          </div>

        </Router>
      </AppProvider>
    </>
  )
}

export default App
