import { createItem, rest } from "@directus/sdk";
import { directusInstance } from "../services/directus"
import { register } from "../services/oauth"

export const createAccount = async (email: string, password: string, username: string) => {
    // const firebaseUser = await register(email, password)
    console.log(directusInstance)
    const directusUser = await directusInstance.with(rest()).request(createItem('app_user', {
        email: 'oke',
        full_name: username,
    }));

    console.log('oke', directusUser)
}