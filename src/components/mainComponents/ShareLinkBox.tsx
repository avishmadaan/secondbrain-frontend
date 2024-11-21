import axios from "axios";
import { CircleX, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"


export function ShareLinkBox(props:{
    userId:string | null | undefined,
    closeDialog:(val:boolean)=>void;
}) {

    const [shareLink, setShareLink] = useState("");

    const [copied, setCopied]= useState(false);

    useEffect(()=> {

getLink()

    }, []);

async function getLink() {
    const hash = "share"+ props.userId + "addads";

    const token = Cookies.get("token")

const response =await axios.post("http://localhost:3000/api/v1/brain/share", {hash}, {

    headers:{
        Authorization:token
    }
});

const link = "http://localhost:5173/public/"+hash;

setShareLink(link)

console.log(response.data);

    
}

async function copyToClipBoard() {
  
   await navigator.clipboard.writeText(shareLink);
   setCopied(true)
   setTimeout(()=> {
setCopied(false);
   }, 3000)

}


    return (

        <div className="">

            <div className="fixed inset-0 bg-black bg-opacity-50 "></div>



    

        <div className="bg-white p-10 border border-gray-200 rounded-md w-[50%] flex flex-col justify-center absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2  shadow-lg">

<div className="">

            <CircleX onClick={()=> props.closeDialog(false)} size={20} className= {`mr-2 cursor-pointer float-right text-purple-500`} />

</div>

<div className="flex justify-center flex-col items-center" id="input">
    <h2 className="text-2xl font-semibold">Your Shareable Link</h2>

    <div className="flex items-center justify-between w-full mt-6">
    <input type="text" value={shareLink} placeholder="Your Link" disabled className="border border-gray-200 p-2 w-full rounded-md  mr-3 " />

<Copy onClick={copyToClipBoard} size={20} className="cursor-pointer "  />

    </div>

    {copied && <span className="mt-2">
        Copied ✅
        </span>}

</div>


        </div>
        </div>
    )
}