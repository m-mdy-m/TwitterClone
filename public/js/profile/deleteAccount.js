import { deleteAccountApi } from "../utils/apiOperations.js";
import { showErrorMessage } from "../utils/helper.js";
import { clearAllToken } from "../utils/utils.js";

export async function deleteAccount(userId){
    try {
        const response = await deleteAccountApi(userId)
        if(response){
            clearAllToken()
            window.location.href = '/auth/signup'
        }
    } catch (error) {
        showErrorMessage(error)
    }
}