import { adminEndponits } from "../../../endpoints/adminEndpoints"
import Api from "../../axiosConfig"

export const getClientByPhone = async (clientName = "", phoneNo = "") => {
    try {
      const response = await Api.get(`${adminEndponits.getClientByPhone}`, {
        params: {
           clientName,
           phoneNo
        }
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };