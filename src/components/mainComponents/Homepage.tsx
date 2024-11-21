import { Plus, Share } from "lucide-react"
import { Button } from "../ui/Button"
import { useContext, useEffect, useState } from "react"
import { ShareLinkBox } from "./ShareLinkBox";
import { UserContext } from "./Layout";
import { AddContentBox } from "./AddContentBox";
import { Outlet, useLocation } from "react-router-dom";
import { AllContent } from "./AllContent";

export function Homepage() {

    const [shareLinkBox, setShareLinkBox] = useState(false);
    const [addContentBox, setAddContentBox] = useState(false);

    const[currentPage, setCurrentPage] = useState("")

    const {userId} =useContext(UserContext) || {};



    return (
        <div className="">

            <div className="flex justify-between items-center mb-10" id="top">
                <h1 className="text-2xl font-bold">Your Content</h1>

                <div className="flex items-center  gap-3" id="right">
                    <Button variant={"secondary"} onClick={() => setShareLinkBox(true) } startIcon={<Share />}>Share Brain</Button>

<Button variant={"primary"} onClick={()=> {setAddContentBox(true)}} startIcon={<Plus />}>Add Content</Button>
                </div>
            </div>

            <div className="" id="bottom">
        
        <AllContent />


            </div>

            {shareLinkBox && (
                <ShareLinkBox closeDialog={setShareLinkBox} userId={userId} />
            )}

{addContentBox && (
                <AddContentBox closeDialog={setAddContentBox} userId={userId} />
            )}


        </div>
    )
}