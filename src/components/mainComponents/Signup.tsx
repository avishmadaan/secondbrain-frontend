import { useForm } from "react-hook-form"
import main_logo from "../../assets/main_logo.png"
import { Button } from "../ui/Button";
import { CircleUser } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Alert } from "../ui/Alert";
import { Link } from "react-router-dom";

export function Signup() {

    const [isLoading, setIsLoading] =  useState(false)

    const [accountExist, setAccountExist] = useState(false);

    const [networkError, setNetworkError] = useState(false);

    const [isSuccessful, setIsSuccessful] = useState(false); 

    interface registrationData {
            email:string;
            password:string
    }

    const {register, handleSubmit, reset , formState:{errors, isValid}} = useForm();

    const onSubmit = async (data:registrationData) => {

        try {
            setIsLoading(true);

            const response = await axios.post("http://localhost:3000/api/v1/user/signup", data);

            console.log(response.data.message);
            setIsSuccessful(true)
            reset();



        }

        catch(e) {
            console.log(e);

            if(e.response.status == 411) {
                setAccountExist(true);

            }

            else {

                setNetworkError(true);


            }



        }

        finally{
            setIsLoading(false);
        }

    }


    return (

       

        <div className="flex flex-col justify-center items-center bg-softGray w-full h-screen">


            <div className="bg-white p-10 border border-gray-200 rounded-md w-[40%] flex flex-col justify-center items-center" id="internal ">

            <img className="w-1/3" src={main_logo} alt="main logo" />

<div className=" w-full " id="signup">

    <h1 className="text-2xl font-bold text-center text-purple-500 my-1 mb-5">Create Your Account Here</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  ">

        <input  type="text" {...register("email", {required:"Email is Required", pattern:{
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message:"Please enter a valid email address"
        }}) } placeholder="Enter Your Email Here" className="border border-gray-200 p-2 w-full rounded-md " />

{errors.email && (
    <span className="text-red-500 text-left text-sm">{errors.email.message as string}</span>
)}


        <input type="password" {...register("password", {required:"Password is Required", pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,

            message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        }})} placeholder="Password.." className="border border-gray-200 p-2 w-full rounded-md mt-3"/>

{errors.password && (
    <span className="text-red-500  text-left text-sm">{errors.password.message as string}</span>
)}


        <Button className="mt-6 w-full text-center" variant={"primary"} type="submit" startIcon={<CircleUser />} disabled={!isValid} loading={isLoading} >Create Account</Button>


    </form>

    <span className="text-center block w-full cursor-pointer text-blue-500 mt-3">
        <Link to={"/signin"} >Signin Here</Link></span>

    


</div>



            </div>


            {isSuccessful && 
            <Alert message={"Account Created Successfully, Go to login page"} type={"positive"} />
            
}


{accountExist && 

<Alert message={"Account with this email already exist"} type={"negetive"} />

}

{networkError &&
<Alert message={"Server Error"} type={"negetive"} />

}

            
           
        </div>
    )
}