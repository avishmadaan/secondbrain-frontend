import { useForm } from "react-hook-form"
import main_logo from "../../assets/main_logo.png"
import { Button } from "../ui/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { Alert, AlertContext } from "../ui/Alert";

export function Signin() {

    useEffect(()=> {

       if(Cookies.get("token"))  {
        navigate("/home")
       }

    }, [])

    const navigate = useNavigate();

    
    const [isLoading, setIsLoading] =  useState(false);


    const {showAlert} = useContext(AlertContext);

    interface registrationData {
        email:string;
        password:string
}


    const {register, handleSubmit, reset , formState:{errors, isValid}} = useForm();

    const onSubmit = async (data:registrationData) => {

        try {

            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", data);

            const token = response.data.token;
            console.log(token)

            Cookies.set("token", token, {expires: 7, path:"/"})

            showAlert("Login Success","positive");

            navigate("/home")

        }

        catch(e) {
            console.log(e.response);

            if(e.response.status == 411) {
                showAlert("Incorrect Credentials","negetive")

            }

            else {
                showAlert("Server Error","negetive")



            }




        }

        finally{
            setIsLoading(false);

        }


    }

    return (
        <div className="flex flex-col justify-center items-center bg-softGray w-full h-screen">

<div className="bg-white p-10 border border-gray-200 rounded-md w-[80%] md:w-[40%] flex flex-col justify-center items-center" id="internal ">

<img className="w-1/4" src={main_logo} alt="main logo" />

<div className=" w-full " id="signup">

<h1 className="text-3xl font-bold text-center text-purple-500 my-1 mb-5">Signin Here</h1>

<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  ">

<input  type="text" {...register("email", {required:"Email is Required" }) } placeholder="Your Email Address Here" className="border border-gray-200 p-2 w-full rounded-md " />

{errors.email && (
    <span className="text-red-500 text-left text-sm">{errors.email.message as string}</span>
)}

<input type="password" {...register("password", {required:"Password is Required"})} placeholder="Password" className="border border-gray-200 p-2 w-full rounded-md mt-3"/>

{errors.password && (
    <span className="text-red-500  text-left text-sm">{errors.password.message as string}</span>
)}

<Button className="mt-6 w-full text-center" variant={"primary"} type="submit" startIcon={<LogIn />} disabled={!isValid} loading={isLoading} >Login</Button>

    </form>

    <span className="text-center block w-full cursor-pointer text-blue-500 mt-3">
    <Link to={"/signup"} >Signup Here</Link></span>


</div>





    </div>


        </div>
    )
}