import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'

function Signup() {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    const {loading} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();  // Prevent the form from reloading the page
        const formData = new FormData();    //formdata object
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            
            console.log(res.data.success);
            if(res.data.success)
            {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar></Navbar>

            <div className='flex items-center justify-center max-w-7xl mx-auto'>

                <form onSubmit={submitHandler} className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>
                    <h1 className='font-black text-xl mb-5'>Sign Up</h1>
                    <div className='my-2 '>
                        <Label className="font-bold">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder="sarath chandra"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="font-bold">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="sarath@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="font-bold">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="font-bold">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={input.role === 'Student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>

                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />

                        </div>

                    </div>

                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  <Button type="submit" className="w-full my-4 bg-[#4b3b60] hover:bg-[#7d5ba6]
                        rounded-full shadow-lg transition-all duration-300 py-2 px-6 text-white" variant="outline">
                            Login
                        </Button>
                    }

                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>


                </form>
            </div>

        </div>

    )
}

export default Signup