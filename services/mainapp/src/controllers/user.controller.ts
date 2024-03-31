import { readItems, updateItem } from "@directus/sdk";
import { directusInstance } from "../services/directus";
import { DirectusUser } from "../typings/models";

export async function getUserByEmail(email : string) {
   return (await directusInstance.request(
      readItems('app_user', {
        filter: {
            email: {
              _eq: email,
            },
        },
      }),
    )) || []
}

export async function updateAppUser(user : DirectusUser){
  return await directusInstance.request(
    updateItem('app_user', user.id, {
      full_name : user.full_name,
      phone_number : user.phone_number, 
      gender : user.gender
    }),
  )
}