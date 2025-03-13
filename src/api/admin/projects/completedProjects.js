import { adminEndponits } from "../../../endpoints/adminEndpoints";
import Api from "../../axiosConfig";

export const getCompletedProjects = async()=>{
    try{
        const response = await Api.get(adminEndponits.getCompletedProjects);
        return response;
    }catch(err){
        console.log(err);
    }
}