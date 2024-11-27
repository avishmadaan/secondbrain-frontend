import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie"

interface ContentContextType {
    content: any; 
    fetchAllContents: () => Promise<void>;
  }

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({children}:{children:ReactNode}) {
    const [content, setContent] = useState();

    async function fetchAllContents() {

        console.log("fetch is called now")

        const token = Cookies.get("token");
    
        try {
          const response = await axios.get("http://localhost:3000/api/v1/content/getall/", {
            headers:{
                Authorization:token
            }
          });
            
    setContent(response.data.content);
    
        }
    
        catch(e) {
            if (axios.isAxiosError(e)) {
            console.log(e.response)
            }
        }
    
        finally {
        }
    
    
       }


       return <ContentContext.Provider value={{content, fetchAllContents}}>
        {children}
       </ContentContext.Provider>

}

export function useContent(): ContentContextType | null{

       return useContext(ContentContext);



}