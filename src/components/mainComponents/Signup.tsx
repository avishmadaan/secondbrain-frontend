import { useForm } from "react-hook-form"
import main_logo from "../../assets/main_logo.png"
import { Button } from "../ui/Button";
import { CircleUser } from "lucide-react";

export function Signup() {

    interface registrationData {
            email:string;
            password:string
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data:registrationData) => {

        console.log(data);


    }


    return (

        <div className="flex flex-col justify-center items-center bg-softGray w-full h-screen">

            <div className="bg-white p-10 border border-gray-200 rounded-md w-[40%] flex flex-col justify-center items-center" id="internal ">

            <img className="w-1/3" src={main_logo} alt="main logo" />

<div className=" w-full " id="signup">

    <h1 className="text-2xl font-bold text-center text-purple-500 my-1 mb-5">Create Your Account Here</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">

        <input  type="text" {...register("email", {required:true, pattern:{
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message:"Please enter a valid email address"
        }}) } placeholder="Enter Your Email Here" className="border border-gray-200 p-2 w-full rounded-md " />

        <input type="password" {...register("password", {required:true, pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,

            message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        }})} placeholder="Password.." className="border border-gray-200 p-2 w-full rounded-md mt-3"/>

        <Button className="mt-6 w-full text-center" variant={"primary"} type="submit" startIcon={<CircleUser />} loading={true} >Create Account</Button>


    </form>

    


</div>



            </div>
            
           
        </div>
    )
}