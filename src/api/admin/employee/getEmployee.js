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

export const getUserById = async () => {
    try {
        const response = await Api.get("/admin/profile"); // No need for ID
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error?.response?.data || error.message);
        throw error;
    }
};
export const editUserById = async (id,values) => {
    try {
        const response = await Api.put(`/admin/edit/${id}`,values); // No need for ID
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error?.response?.data || error.message);
        throw error;
    }
};