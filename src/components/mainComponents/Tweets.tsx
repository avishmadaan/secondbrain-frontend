import { LoaderCircle } from "lucide-react";
import { ContentBox } from "./ContentBox";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";

export function Tweets() {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchTweets()

    }, [])

    async function fetchTweets() {

        const token = Cookies.get("token");

        try {
            setLoading(true);
          const response = await axios.get("http://localhost:3000/api/v1/content/getbytype/tweet", {
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

    return (

        <div className="">

<div className="flex justify-between items-center mb-10 " id="top">
                <h1 className="text-2xl font-bold">Tweets</h1>



                </div>

                {loading &&<LoaderCircle className="animate-spin mx-auto" /> }

{content.length==0 && !loading &&(<span className=" text-center block">
    No Tweeets Yet
    </span>)}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">


    {content && (
                <>{content.map((content, index) => {

                   return <ContentBox link={content.link} type={content.type} title={content.title} tags={content.tags} description={content.description} id={content._id}></ContentBox>

               })}</>)
            }




                </div>


        </div>



    )
}