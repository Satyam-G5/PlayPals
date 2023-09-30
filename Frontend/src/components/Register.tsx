import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
    
    const Navigate = useNavigate()
    interface parentData {
        name: string ;
        address: string,
        phone_no: number,
        email: string,
        child_name: string,
        child_age: string,
        gender: string,
        password: string,
    }

    const [formData, setFormData] = useState<parentData>({
        name: '',
        address: '',
        phone_no: 0,
        email: '',
        child_name: '',
        child_age: '',
        gender: '',
        password: '',
    });

    const saveuser = async () => {

        const {name , address , phone_no , email ,child_name ,child_age , gender ,password} = formData
        try {
            const response = await fetch( "https://playpals.onrender.com" + "/newuser" , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name,
                  address,
                  phone_no,
                  email,
                  child_name,
                  child_age,
                  gender,
                  password
                })
                });

                if (response.ok){
                    console.log("User Save to Database")
                    Navigate("/")
                }
                else{
                    console.log("User not saved to Database")
                }
        } catch (error) {
            console.log(error)
        }
        


    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                <h2 className="text-2xl text-center font-semibold mb-10">Welcome to PLAYPALS</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-24 gap-y-12 mt-12">
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
                                className="w-48 p-2 ml-4 border rounded-md h-8 "
                            />
                        </div>
                        <div className="flex flex-row justify-around ">
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
                                City
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-48 ml-4 p-2 border rounded-md h-8"
                            />
                        </div>
                        <div className="flex flex-row justify-around ">
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
                                Child Name
                            </label>
                            <input
                                type="text"
                                id="child_name"
                                name="child_name"
                                value={formData.child_name}
                                onChange={handleChange}
                                className="w-48 ml-4 p-2 border rounded-md h-8"
                            />
                        </div>
                        <div className="flex flex-row justify-around ">
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
                                Child Age
                            </label>
                            <input
                                type="text"
                                id="child_age"
                                name="child_age"
                                value={formData.child_age}
                                onChange={handleChange}
                                className="w-48 ml-4 p-2 border rounded-md h-8"
                            />
                        </div>
                        <div className="flex flex-row justify-around ">
                            <label htmlFor="gender" className="block text-sm font-medium mb-1">
                                 Child's Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-row justify-around ">
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
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
                    <div className="mt-4 mb-3 p-4">

                    <div className="flex flex-row justify-around ">
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
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
                            <label htmlFor="address" className="block text-sm font-medium mt-2">
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
                        
                        Register
    
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
