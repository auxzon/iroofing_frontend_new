
import { getCustomers } from "../api/admin/customers/getcustomers";
import { product } from "../api/admin/labour/gst";
import { welding } from "../api/admin/labour/welding";
import { getAllProjectTypes } from "../api/admin/product/getAllCategories";

// admin endpoints
export const adminEndponits = {
    addEmployee:"admin/employee",
    getEmployee:"admin/employee",
    getClient:"admin/client",
    addNewclient:"admin/client",
    login:"auth/login",
    forgotpassword:"auth/request-otp",
    getCustomers:"admin/customers",
    sheeting:"admin/labourcost",
    welding:"admin/labourcost/Welding",
    verifyotp:"auth/verify-otp",
    resetpassword:"auth/reset-password",
    gst:"admin/gst",
     addCategory:"admin/createCategory",
     getAllCategories:"admin/getAllCategories",
     getAllProjectTypes:"admin/getAllProjectType"
}