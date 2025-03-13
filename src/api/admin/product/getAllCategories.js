import { adminEndponits } from "../../../endpoints/adminEndpoints";
import Api from "../../axiosConfig";
 
export const getAllCategories = async () => {
    try {
        const response = await Api.get(adminEndponits.getAllCategories);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getAllProjectTypes = async () => {
    try {
        const response = await Api.get(adminEndponits.getAllProjectTypes);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};