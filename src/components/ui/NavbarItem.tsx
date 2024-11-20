import { ReactElement } from "react"

export function NavbarItem(props:{
    name:string,
    icon:ReactElement
}) {

    return(
        <div className="flex  p-2  w-full cursor-pointer hover:bg-softGray rounded-md my-4 hover:text-gray-800">
            <span className="pr-4
            ">
            {props.icon}

            </span>
            <span className="">
            {props.name}

            </span>


        </div>
    )
}