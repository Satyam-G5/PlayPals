import {useContext} from 'react'
import AppContext from '../context/authcontext'

const Dashboard : React.FC= () => {

  const appContext = useContext(AppContext)

  const clicked =  () => {
    console.log(appContext?.token)
    console.log(appContext?.loginState)

    console.log(appContext?.getuser_details)
  }

  return (
    <div>
      This is Dashboard
      <button className='text-black h-8 w-12 ' onClick={clicked}>Click</button>
    </div>
  )
}

export default Dashboard
