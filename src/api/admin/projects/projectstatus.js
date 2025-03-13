import { adminEndponits } from "../../../endpoints/adminEndpoints";
import Api from "../../axiosConfig";

export const getProjectStatus = async () => {
    try {
        const response = await Api.get(adminEndponits.getProjectStatus); 
        return response;
    } catch (err) {
        console.error("Error fetching project status:", err);
    }
};
