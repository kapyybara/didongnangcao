import { readItems } from "@directus/sdk";
import { directusInstance } from "../services/directus";

export async function getUserByEmail(email : string){
   return (await directusInstance.request(
      readItems('account', {
        filter: {
          user_id: {
            email: {
              _eq: email,
            },
          },
        },
      }),
    )) || []
}