import axios from "axios";
import { baseApi } from "./config";

const useGet = async (url) => {
    try{
        let headers = {
            'Content-Type': 'application/json'
        }
        const completeUrl = baseApi + url;
        const response = await axios.get(completeUrl, {headers: headers});

        console.log("GET", "url", url, "response", response.data);

        return {success:true, data:response.data.data};

    }
    catch(error){
        console.error("GET", "url", url, "error", error);
        return {
            success:false, 
            error:error.response?error.response.data:error.message
        };
    }

    // return axios.get(`${baseApi}/${url}`);
    
}

export {useGet}
