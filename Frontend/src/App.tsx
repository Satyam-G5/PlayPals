import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar"


function App() {
  

  return (
    <Router>
      <div className='w-screen'>
        <Routes>
        <Route path="/" element={<><Navbar /></>} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
