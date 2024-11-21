import { CircleX } from "lucide-react"
import { createContext, useEffect, useState } from "react";

export const AlertContext = createContext(null);

export function AlertProvider({children}) {

    const[alert, setAlert] = useState(null);

    function showAlert(message:string, type:"positive" |"negetive" ) {

        setAlert({message, type});

        setTimeout(()=> {
            setAlert(null);
        }, 5000)
    }

    function closeAlert() {
        setAlert(null);

    }

    return (
        <AlertContext.Provider value={{showAlert}}>
            {children}
            {alert && <Alert closeAlert={closeAlert} message={alert.message} type={alert.type} /> }


        </AlertContext.Provider>
    )


}

export function Alert(props:{
    message:string;
    type:"positive" | "negetive";
    closeAlert?:(val:boolean)=> void;
}) {



    return (

        <div className={`bg-white p-3 border  rounded-md flex items-center justify-center absolute duration-300  top-8 left-1/2 -translate-x-1/2 shadow-lg
        ${props.type =="positive"?"border-green-500":"border-red-500"} `}>


            <CircleX size={20} onClick={props.closeAlert} className= {`mr-2 cursor-pointer ${props.type =="positive"?"text-green-500":"text-red-500"}  `} />

            {props.message}
        </div>
    )
}