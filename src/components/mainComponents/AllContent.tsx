import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Layout";
import Cookies from "js-cookie"
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { ContentBox } from "./ContentBox";

export function AllContent() {

    const {userId} =useContext(UserContext) || {};
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchAllContents()

    }, [])

   async function fetchAllContents() {

    const token = Cookies.get("token");

    try {
        setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/content/getall/", {
        headers:{
            Authorization:token
        }
      });
        
console.log(response.data)
setContent(response.data.content);

    }

    catch(e) {
        console.log(e.response)
    }

    finally {
        setLoading(false);
    }


   }

    return(
        <>
{loading &&<LoaderCircle className="animate-spin mx-auto" /> }

{content.length==0 && !loading &&(<span className=" text-center block">
                        No Content Created Yet

                    </span>)}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">


                    {content && (
                <>{content.map((content, index) => {

                   return <ContentBox link={content.link} type={content.type} title={content.title} tags={content.tags} description={content.description} id={content._id}></ContentBox>

               })}</>)
            }

                    
            
        </div>
        </>
    )
}