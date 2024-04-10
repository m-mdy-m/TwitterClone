import { deleteAccountApi } from "../utils/apiOperations.js";
import { showErrorMessage } from "../utils/helper.js";

export async function deleteAccount(){
    try {
        const response = await deleteAccountApi()
    } catch (error) {
        showErrorMessage(error)
    }
}