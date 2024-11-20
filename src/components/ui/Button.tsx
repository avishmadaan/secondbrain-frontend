import { Loader, Loader2 } from "lucide-react";
import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary",
    children:any;
    onClick?: ()=> void;
    size?:"sm" | "md" | "lg";
    text?:String;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    className?:string;
    type?:"submit" | "reset" |"button";
    loading?:boolean;
    disabled?:boolean
}

const variantStyles = {
    "primary":"bg-purple-500 text-white",
    "secondary":"bg-purple-300 text-purple-500"
}

const defaultStyles = `rounded-md px-6 py-3 flex justify-center gap-2 hover:-translate-y-1 duration-200  `;



export const Button = (props:ButtonProps)=> {

    return <button type={props.type} onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${props.className}  ${props.disabled ? "bg-gray-500 ":""}`} >

        {!props.loading && (
            <>
            {props.startIcon}
            {props.children}
            {props.endIcon}
            </>
        )}
    
    {props.loading && <Loader2 className="animate-spin" />}
    
    </button>



}
