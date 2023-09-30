import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bregister: React.FC = () => {
  const Navigate = useNavigate()
  interface parentData {
    name: string;
    age: number;
    gender: string;
    image: string;
    phone_no: number;
    exp_hrs: number;
    description: string;
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<parentData>({
    name: '',
    age: 0,
    gender: '',
    image: '',
    phone_no: 0,
    exp_hrs: 0,
    description: '',
    email: '',
    password: '',
  });

  const saveuser = async () => {

    const { name, age, gender, image, phone_no, exp_hrs, description, email, password } = formData
    try {
      const response = await fetch("/newBsitter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          image,
          phone_no,
          exp_hrs,
          description,
          email,
          password
        })
      });

      if (response.ok) {
        console.log("User Save to Database")
        Navigate("/")
      }
      else {
        console.log("User not saved to Database")
      }
    } catch (error) {
      console.log(error)
    }

  }


  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files } = e.target;
  
    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        setFormData((prevData: any) => ({
          ...prevData,
          image: reader.result, 
        }));
      };
  
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send formData to your backend API for registration
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{
      background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
    }}>
      <div className=" w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-bold mb-10">WELCOME TO PLAYPALS</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 mt-12">
            <div className='flex flex-row justify-around'>
              <label htmlFor="name" className="block text-sm font-medium mt-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-48 p-2 ml-10 border rounded-md h-8 "
              />
            </div>
            <div className="flex flex-row justify-around ">
              <label htmlFor="age" className="block text-sm font-medium mt-2">
                age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-48 ml-4 p-2 border rounded-md h-8"
              />
            </div>
            <div className="flex flex-row justify-around ">
              <label htmlFor="exp_hrs" className="block text-sm font-medium mt-2">
                Attend Cost (max-$20)
              </label>
              <input
                type="text"
                id="exp_hrs"
                name="exp_hrs"
                value={formData.exp_hrs}
                onChange={handleChange}
                className="w-48  p-2 border rounded-md h-8"
              />
            </div>
            <div className="flex flex-row justify-around ">
              <label htmlFor="gender" className="block text-sm font-medium mt-2 p-4">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md "
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex flex-row justify-around ">
              <label htmlFor="file" id='imageupload' className="block text-sm font-medium mt-2 hover:cursor-pointer">
                Upload Image
              </label>
              {}
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*" // Specify accepted file types (e.g., images)
                onChange={handleChange}
                className='w-48 ml-4 hover:cursor-pointer'
              />
            </div>
            <div className="flex flex-row justify-around  mt-4">
              <label htmlFor="Phone_no" className="block text-sm font-medium mt-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_no"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                className="w-48 ml-4 p-2 border rounded-md h-8"
              />
            </div>
          </div>
          <div className="col-span-full mt-8">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea

                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
          </div>
          <div className="mt-4 mb-3 p-4">

            <div className="flex flex-row justify-around ">
              <label htmlFor="Email" className="block text-sm font-medium mt-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-48 ml-4 p-2 border rounded-md h-8"
              />
            </div>
            <div className="flex flex-row justify-around mt-4">
              <label htmlFor="Password" className="block text-sm font-medium mt-2">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-48 ml-4 p-2  border rounded-md h-8"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={saveuser}
          >

            Join The  Crew

          </button>
        </form>
      </div>
    </div>
  )
}

export default Bregister
