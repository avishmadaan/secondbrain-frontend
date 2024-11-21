import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Cookies from "js-cookie";
import {  useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import  {jwtDecode}  from "jwt-decode";
import { Homepage } from "./Homepage";

interface userContextType {

    userId:string | null
}

export const UserContext = createContext<userContextType | null>(null);

export function Layout() {

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();


    useEffect(()=> {

        const token = Cookies.get("token");

        if(!token)  {
         navigate("/signin")
        }
        else {

            const decoded = jwtDecode(token);
            console.log(decoded);
            setUserId(decoded.id);
            console.log(userId);
        }
 
     }, [])
 


    return (
        <UserContext.Provider value={{userId}}>
        <div className="grid md:grid-cols-[1fr_4fr] ">

            <div className="
            ">
                <Navbar ></Navbar>
            </div>

            <div className="bg-softGray h-screen w-full p-6
            ">
              <Outlet />
                
            </div>


        </div>
        </UserContext.Provider>
    )
}