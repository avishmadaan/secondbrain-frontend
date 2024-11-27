import { CircleX, Plus } from "lucide-react";
import {useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import { AlertContext } from "../ui/Alert";
import { useContent } from "./useContent";

export function AddContentBox(props:{
    userId:string | null | undefined,
    closeDialog:(val:boolean)=>void;
}) {

    const [isLoading, setIsLoading] =  useState(false)


      // Context for showing alerts
  const alertContext = useContext(AlertContext);
  const showAlert = alertContext?.showAlert;

    

    const contentContext  = useContent();
    const fetchAllContents = contentContext?.fetchAllContents;

 const contentTypes = ["tweet", "video", "document","link"];

    

    const {register, handleSubmit , formState:{errors, isValid}} = useForm();

    const onSubmit = async (data) => {

        const tagArr = data.tags.split(",");
        const newData = {...data, 
            tags:tagArr, 
            userId:props.userId
        }
        console.log("newData", newData)
        const token = Cookies.get("token");

        try {

            setIsLoading(true)

            const response = await axios.post("http://localhost:3000/api/v1/content/add/", newData,  {

                headers:{
                    Authorization: token
                }

            })

            console.log(response.data)
              // Check if showAlert is defined before calling it
      if (showAlert) {
        showAlert("Content Added Successfully", "positive");
      }
            props.closeDialog(false);
            console.log("before fetchnig called");

            if(fetchAllContents) {

                fetchAllContents();
            }
            console.log("after fetchnig called")

        }

        catch(e) {
            if(axios.isAxiosError(e)) 
            console.log(e.response)
        }

        finally {
            setIsLoading(false);
        }

    


    }

    return(
        <div className="">
            <div className="fixed inset-0 bg-black bg-opacity-50 "></div>

            <div className="bg-white p-10 border border-gray-200 rounded-md w-[50%] flex flex-col justify-center absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  shadow-lg">

<div className="absolute right-5 top-5">

            <CircleX onClick={()=> props.closeDialog(false)} size={24} className= {`cursor-pointer  text-purple-500`} />

</div>

<div className="" id="addBox">

   <h1 className="text-2xl font-bold text-center my-1 mb-5">Add Your Content</h1>

   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
    <label htmlFor="type" className="font-semibold">Select Your Type</label>
    <select {...register("type")} id="type" name="type"  className="border border-gray-200 p-2 w-full rounded-md mt-1" >

        {contentTypes.map((type, index)=> (
                <option key={index} value={`${type}`}>{`${type.substring(0,1).toUpperCase().concat(type.substring(1,type.length))}`}</option>
        ))}

        </select>


        <label htmlFor="link" className="font-semibold mt-3">Link</label>

        <input {...register("link")} type="text" id="link" placeholder="Content Link" className="border border-gray-200 p-2 w-full rounded-md mt-1" />


        <label htmlFor="title" className="font-semibold mt-3">Title*</label>

<input {...register("title",{required:"Title is Required"})}  type="text" id="title" placeholder="For Ex. My favouite tweet on saas" className="border border-gray-200 p-2 w-full rounded-md mt-1" />

{errors.title && (
    <span className="text-red-500 text-left text-sm">{errors.title.message as string}</span>
)}


<label htmlFor="description" className="font-semibold mt-3">Description</label>

<textarea {...register("description")} id="description" placeholder="I love how this tweet described what is saas." className="border border-gray-200 p-2 w-full rounded-md mt-1" />

<label htmlFor="tag" className="font-semibold mt-3">Tags</label>

<input {...register("tags")} type="text" id="tag" placeholder="Enter your tags seperated via commas" className="border border-gray-200 p-2 w-full rounded-md mt-1" />

<Button className="mt-6 w-full text-center" variant={"primary"} type="submit" startIcon={<Plus />} disabled={!isValid} loading={isLoading} >Add Content</Button>


   </form>
</div>

</div>




        </div>
    )
}