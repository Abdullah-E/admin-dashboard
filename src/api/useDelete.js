import axios from "axios";
import { baseApi } from "./config";

const useDelete = async (url, params=null) => {
    try{
        let headers = {
            'Content-Type': 'application/json'
        }
        const completeUrl = baseApi + url;
        const response = await axios.delete(completeUrl, {headers: headers, params: params});

        console.log("DELETE", "url", url, "response", response.data, "params", params);
        return {success:true, data:response.data.data}
    }
    catch(error){
        console.error("DELETE", "url", url, "error", error, "params", params);
        return {
            success:false, 
            error:error.response?error.response.data:error.message
        };
    }
}

export {useDelete}