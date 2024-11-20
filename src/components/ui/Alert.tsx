import { CircleX } from "lucide-react"
import { useEffect, useState } from "react";

export function Alert(props:{
    message:string;
    type:"positive" | "negetive"
}) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        show();
    }, [])

    function show() {
        setVisible(true)

        setTimeout(() => {
            setVisible(false)
        }, 5000)


    }

    function closeAlert() {
        setVisible(false);
    }


    return (

        <div className={`bg-white p-3 border  rounded-md flex items-center justify-center absolute duration-300 -traslate-y-8 top-8 
        ${visible?"opacity-100":"opacity-0"}
        ${props.type =="positive"?"border-green-500":"border-red-500"} `}>


            <CircleX size={20} onClick={closeAlert} className= {`mr-2 cursor-pointer ${props.type =="positive"?"text-green-500":"text-red-500"}  `} />

            {props.message}
        </div>
    )
}