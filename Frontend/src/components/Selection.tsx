import { useContext} from 'react'
import { Link } from 'react-router-dom';
import AppContext  from '../context/authcontext'


const Selection : React.FC= () => {

  const appcontext = useContext(AppContext);
  const storedName = localStorage.getItem('b_name')
  const storedEmail = localStorage.getItem('selectedBisitter');


  return (
<main className="grid min-h-full place-items-center bg-white px-6 py-24 mt-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-xl font-semibold text-indigo-600">Success</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{storedName}  {storedEmail || appcontext?.selectedBsitter}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You have successfully booked the caretaker</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
             
            <Link  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" to="/dashboard" >
            Dashboard
            </Link>
           
          </div>
        </div>
      </main>
  )
}

export default Selection
