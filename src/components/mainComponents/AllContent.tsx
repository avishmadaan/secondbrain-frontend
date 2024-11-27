import { Children, createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./Layout";
import { LoaderCircle } from "lucide-react";
import { ContentBox } from "./ContentBox";
import { useContent } from "./useContent";



export function AllContent() {

    const {userId} =useContext(UserContext) || {};
    const [loading, setLoading] = useState(false);


    const {content, fetchAllContents } = useContent();

    useEffect(() => {
        fetchAllContents();


    }, [])


    return(
        <>
{loading &&<LoaderCircle className="animate-spin mx-auto" /> }

{content?.length==0 && !loading &&(<span className=" text-center block">
                        No Content Created Yet

                    </span>)}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">


                    {content && (
                <>{content.map((content, index:number) => {

                   return <ContentBox 
                   key={index} link={content.link} type={content.type} title={content.title} tags={content.tags} description={content.description} id={content._id}></ContentBox>

               })}</>)
            }

                    
            
        </div>
        </>
    )
}