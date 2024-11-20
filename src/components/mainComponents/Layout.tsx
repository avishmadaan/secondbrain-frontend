import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {


    return (
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
    )
}