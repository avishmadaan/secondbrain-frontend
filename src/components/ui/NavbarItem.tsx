import { ReactElement } from "react"
import { Link } from "react-router-dom"

export function NavbarItem(props:{
    name:string,
    icon:ReactElement,
    isActive?:boolean
}) {

    const linkTo = props.name.toLowerCase() === "home" ? "/home" : `${props.name.toLowerCase()}`;

    return(
        <Link to={linkTo}>
        <div className={`flex  p-2  w-full cursor-pointer hover:bg-softGray rounded-md my-4 hover:text-gray-800  ${
          props.isActive ? "bg-softGray" : ""
        }`}>
            <span className="pr-4
            ">
            {props.icon}

            </span>
            <span className="">
            {props.name}

            </span>


        </div>
        </Link>
    )
}