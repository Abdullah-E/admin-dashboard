import axios from "axios";
import { baseApi } from "./config";


const usePut = async (url, params = null, body) =>{

    try{
        let headers = {
            'Content-Type': 'application/json'
        }
        const completeUrl = baseApi + url;
        const response = await axios.put(completeUrl, body, {headers: headers, params: params});

        console.log("PUT", "url", url, "response", response.data);
        if(response?.data?.success){
            return response.data.data;
        }
        else{
            throw new Error(response.data.error);
        }
    }
    catch(error){
        console.error("PUT", "url", url, "error", error);
        return {
            success:false, 
            error:error.response?error.response.data:error.message
        };
    }
}

export {usePut}