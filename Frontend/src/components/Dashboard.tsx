import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [gotuser, setgotUser] = useState({
    address: '',
    child_age: 0,
    child_name: '',
    email: '',
    gender: '',
    name: '',
    password: '',
    phone_no: 0,
  });

  const storednewUser = localStorage.getItem('newuser');
  const storedCid = localStorage.getItem('conversationID');

  useEffect(() => {
    if (storednewUser !== null) {
      const parsedUser = JSON.parse(storednewUser);
      setgotUser(parsedUser);
    }
  }, []);

  return (
    <div className=" h-screen">
      <div
        className="flex flex-row justify-between rounded-lg mr-2 h-24 top-28 fixed w-screen"
        style={{
          background:
            'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
        }}
      >
        <div className="hidden md:block md:text-white p-6 md:text-3xl md:font-bold h-24">DASHBOARD</div>
        <div className="text-white p-6 text-3xl font-bold mr-4">
          Hello , {gotuser.name}
        </div>
      </div>
      <div className="mx-auto max-w-8xl py-12 px-4 sm:px-6 lg:px-8 shadow-gray-500 rounded-2xl ">
        <div className="bg-white overflow-hidden text-4xl text-black shadow sm:rounded-lg mt-48 p-4  ">
          <p className="font-semibold text-center">We provide the best for your kid - {gotuser.child_name} </p>
        </div>
      </div>

      {/* Cards Row */}
      <div className="flex flex-col justify-evenly sm:flex-row mt-4">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-md p-4 w-full sm:mb-4 sm:w-[40%]">
          <h2 className="text-xl text-center font-semibold mb-4">Book your Care Taker</h2>
          <p className="text-gray-600">
            Book for {gotuser.child_name} his/her personal Care Taker , it take no more than mere 2 minutes to do so. We work all week so we could deliver best services for you and your child . Book our caretaker today , and rest assured .
          </p>
          {storedCid ? (
            <Link to="/booked">
            <button className="ml-28 md:ml-52 text-white text-center py-2 px-4 mt-4 rounded-md"style={{
                background:
                  'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
              }}>
              Booking Done
            </button>
          </Link>
          ) : (
          <Link to="/book_bsitter">
            <button className="ml-28 md:ml-52 text-white text-center py-2 px-4 mt-4 rounded-md"style={{
                background:
                  'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
              }}>
              Book Services
            </button>
          </Link>
            )}
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-md p-4 w-full sm:w-[40%] sm:mb-4">
          <h2 className="text-xl text-center font-semibold mb-2">Chat Anytime</h2>
          <p className="text-gray-600">
           Still worried about your child , Chat with the caregivers any time with real-time communication and get the update on your child . Keep the environment friendly and respect our community guidelines . 
          </p>
          {storedCid ? (
          <Link to="/chat">
            <button className=" text-white py-2 ml-32 md:ml-52 px-4 mt-4 rounded-md"style={{
          background:
            'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
        }}>
              Chat Now
            </button>
          </Link>

          ) : (
            <button className=" text-white bg-gray-500 py-2 ml-32 md:ml-52 px-4 mt-4 rounded-md">
                  Chat Now
                </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="flex flex-col mt-16 ">
        <h2 className="text-2xl text-center font-semibold mt-2 mb-12">Our Customer Reviews</h2>
        {/* Review Cards */}
        <div className="flex flex-col md:w-[95%] md:ml-10 md:flex-row">
          {/* Review Card 1 */}
          <div className="bg-white shadow-lg md:w-[30%] rounded-md p-4 flex flex-col sm:w-1/2 sm:mr-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Aryan Manhotra</h3>
            <p className="text-gray-600">
              "I got the best services i can hope for my child . We usually stay away from home due to
               work and are unable to give enough attention to our child but with PlayPals we can rest assured
                as the services are best and we can check on kid even during work . It is the best ."
            </p>
            <p className="text-gray-500 mt-2">Rating: 5 stars</p>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white shadow-lg md:w-[30%] rounded-md p-4 flex flex-col sm:mr-4 sm:w-1/2 mb-4">
            <h3 className="text-lg font-semibold mb-2">Disha Pandey</h3>
            <p className="text-gray-600">
              "It's a good platform where students can work part time and help the people.
               Real time chatting help to monitor the kid is the great initiative ."
            </p>
            <p className="text-gray-500 mt-2">Rating: 4 stars</p>
          </div>
          {/* Review Card 3 */}
          <div className="bg-white shadow-lg md:w-[30%] rounded-md p-4 flex flex-col sm:mr-4 sm:w-1/2 mb-4">
            <h3 className="text-lg font-semibold mb-2">Harshad Mehta</h3>
            <p className="text-gray-600">
              "I have been using this for quite a time and was never dissapointed . I love how friendly the care takers are 
              and take their job seriously . Price is also reasonable for time they spend . For me it was just the best experiance ."
            </p>
            <p className="text-gray-500 mt-2">Rating: 5 stars</p>
          </div>
        </div>
      </div>

      {/* Trusted by Many Families */}
      <div className="flex flex-col mt-16">
        <h2 className="text-2xl text-center font-semibold mt-2 mb-12">Trusted by Many Families :-)</h2>
        <div className="flex flex-row justify-evenly mt-4">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-md p-4 w-full md:w-[40%] sm:w-1/2 sm:mr-4">
            <h3 className="text-lg font-semibold">Safety First</h3>
            <p className="text-gray-600">
              Our top priority is the safety of your child. We ensure a safe and
              secure environment for them.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-md p-4 w-full md:w-[40%] sm:w-1/2 sm:mr-4">
            <h3 className="text-lg font-semibold">Matched with Local Caregivers</h3>
            <p className="text-gray-600">
              We match your child with local caregivers who are experienced and
              trusted by the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
