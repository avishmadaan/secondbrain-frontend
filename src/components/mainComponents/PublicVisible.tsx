import { useParams } from "react-router-dom";
import main_logo from "../../assets/main_logo.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { ContentBox } from "./ContentBox";
export function PublicVisible() {

    const {hash} = useParams();
    const [available, setAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        checkIfAvailable()
    }, [])

   async function checkIfAvailable() {

    setLoading(true)
    console.log("checking")

    try {
        setLoading(true);

        const response =  await axios.get("http://localhost:3000/api/v1/brain/public/"+hash)
     
         const data = response.data;
         console.log(data)
         setAvailable(true);
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

        <div className="bg-white p-2 border-b border-gray-200" id="nav">
            <img src={main_logo} alt="logo" className="mx-auto" />

        </div>

        <div className="h-screen p-5 bg-softGray flex justify-center">

            {loading ? (<Loader2 className="animate-spin" size={48} />): (
                <>
   {available && content.length >0?(
    <>
  

    {content && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">{content.map((content, index) => {

           return <ContentBox key={index} link={content.link} type={content.type} title={content.title} tags={content.tags} description={content.description} id={content._id}></ContentBox>
           
       })}</div>)
    }
    </>

):(
 <h2 className="">Sorry! Content Is Not Being Shared or Wrong Link</h2>
)}
</>

            )}
         
         
        </div>

       
      </div>
    )
}