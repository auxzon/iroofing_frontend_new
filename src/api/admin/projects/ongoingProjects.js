import { adminEndponits } from "../../../endpoints/adminEndpoints";
import Api from "../../axiosConfig";

export const getOngoingProjects = async()=>{
    try{
        const response = await Api.get(adminEndponits.getOngoingProjects);
        return response;
    }catch(err){
        console.log(err);
    }
}