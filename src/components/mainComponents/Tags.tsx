import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Layout";
import axios from "axios";
import Cookies from "js-cookie"
export function Tags() {

    const {userId} =useContext(UserContext) || {};

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        fetchTags()


    }, [])

    async function fetchTags() {

    const token = Cookies.get("token");

        try {
            setLoading(true);
          const response = await axios.get("http://localhost:3000/api/v1/content/getalltags/", {
            headers:{
                Authorization:token
            }
          });
            
 console.log(response.data)

 setTags(response.data.tags);

        }

        catch(e) {
            console.log(e.response)
        }

        finally {
            setLoading(false);
        }


    }


    return(
        <div className="">
        
        <div className="flex justify-between items-center mb-10 " id="top">
                <h1 className="text-2xl font-bold">Tags</h1>


                {/* <div className="flex items-center  gap-3" id="right">

                <Button variant={"primary"} onClick={() => (true) } startIcon={<Plus />}>Add Tag</Button>

                </div> */}

                </div>


                <div className="mt-5" id="tags">

                    {loading &&<LoaderCircle className="animate-spin mx-auto" /> }

                    {tags.length==0 && !loading &&(<span className=" text-center block">
                        No Tags Created Yet

                    </span>)}
                

               {tags && (
                <>{tags.map((tag, index) => {
                    console.log(tag.title);

                   return <div key={index} className="bg-white p-3 my-5 rounded-md">{tag.title}</div>

               })}</>)
            
            }



                </div>
        </div>
    )
}