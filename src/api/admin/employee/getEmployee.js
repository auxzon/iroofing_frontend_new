import { adminEndponits } from "../../../endpoints/adminEndpoints";
import Api from "../../axiosConfig";

export const getEmployee = async()=>{
    try{
        const response = await Api.get(adminEndponits.getEmployee);
        return response;
    }catch(err){
        console.log(err);
    }
}