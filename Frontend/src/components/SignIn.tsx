import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../context/authcontext';


const SignIn: React.FC = () => {

  const appContext = useContext(AppContext);
  
  
  const login_success :boolean = true
  
  const navigator = useNavigate()
  interface user {
    email: string;
    password: string;
  }

  // interface responsetype {
  //   success : boolean ;
  //   token : string ;
  // }
  const [data, setData] = useState<user>({
    email: "",
    password: ""
  });

  const checkuser = async () => {
    const { email, password } = data;
    try {
      const response = await fetch("/user_log", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const getresponse = await response.json();
      console.log("Full response:", getresponse); // Log the full response
      const newtoken = getresponse.token;
      console.log("Token:", newtoken); // Log the token
      
      
      if (getresponse.success) {

        // const { changeLoginState , changeToken , token } = appContext;
        if (!appContext) {
          console.log("appContext is empty")
          return null; // or render a loading/error message
        }
         appContext.changeLoginState(login_success)
         appContext.changeToken(newtoken)
        
        navigator("/dashboard");
      } 
      else {
        console.log("Login failed:", getresponse.message);
      }
    } 
    catch (error) {
      console.log("Error:", error);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send formData to your backend API for registration
    console.log(data);
  };
  return (
    <div>
      <section className="gradient-form min-h-screen bg-neutral-200 dark:bg-neutral-700">
        <div className="container min-h-screen p-5 overflow-auto ">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div
                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">

                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">

                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIxpmi5_Wh1poUAJkw4JmbHcPnBm8qSnOT-nMLwO9uPghEysB1T4AFIFLADKMIiBQDTiQ&usqp=CAU"
                          alt="logo" />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Welcome to PlayPals
                        </h4>
                      </div>

                      <p className="mb-4">Please login to your account</p>
                      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">Email address</label>
                          <div className="mt-2">
                            <input onChange={handleChange} id="email" name="email" type="email" required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">Password</label>

                          </div>
                          <div className="mt-2">
                            <input onChange={handleChange} id="password" name="password" type="password" required className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                            }}
                            onClick={checkuser}
                          >

                            Log in

                          </button>

                        </div>


                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <Link to={"/register_user"}>
                              Register
                            </Link>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>


                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none flex-col justify-between"
                    style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                      <button
                            type="button"
                            className="mt-8 right-4 text-white fixed inline-block rounded border-2 border-danger p-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <Link to={"/BsignIn"}>
                              Member Login
                            </Link>
                          </button>
                    <div className="px-4 py-6 mt-44 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                      Welcome to PlayPals! Unleash your inner child and embark on a journey filled with fun, learning, and excitement. Join our vibrant community of like-minded explorers and unlock a universe of endless possibilities. Get ready to Play, Learn, and Connect with PlayPals – Where Every Day is an Adventure!"
                      </p>
                    </div>
                    <div className="flex items-center justify-between pb-6 text-white mb-16">

                          <p className="mb-0 mr-2">Looking for part time job , We are actively hiring</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <Link to={"/register"}>
                              Join
                            </Link>
                          </button>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn
