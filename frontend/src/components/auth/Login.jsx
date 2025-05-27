import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'


function Login() {
    const [input,setInput] = useState({
        
        email: "",
        password: "",
        role: "",

    })

    const {loading} = useSelector(store => store.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();  // Prevent the form from reloading the page
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`,input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            console.log(res.data.success);
            if(res.data.success)
            {
                dispatch(setUser(res.data.user))
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error object:", error); // Log the entire error object for inspection
            if (error.response) {
                console.log("Error response:", error.response);
                toast.error(error.response.data?.message || "An error occurred");
            } else if (error.request) {
                console.log("Error request:", error.request);
                toast.error("No response from the server. Please try again.");
            } else {
                console.log("Error message:", error.message);
                toast.error("Request failed. Please check your connection.");
            }
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
                    <h1 className='font-black text-xl mb-5'>Login</h1>
                    
                    <div className='my-2 '>
                        <Label className = 'font-bold'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="sarath@gmail.com"
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label className = 'font-bold'>Password</Label>
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
                     
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  <Button type="submit" className="w-full my-4 bg-[#4b3b60] hover:bg-[#7d5ba6]
                        rounded-full shadow-lg transition-all duration-300 py-2 px-6 text-white" variant="outline">
                            Login
                        </Button>
                    }



                   

                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>


                </form>
            </div>

        </div>

    )
}

export default Login