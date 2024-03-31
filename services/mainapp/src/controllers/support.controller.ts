import { createItem } from "@directus/sdk";
import { directusInstance } from "../services/directus";

export async function sendSupport(email: string , subject : string , message : string){
    return await directusInstance.request(
        createItem('support', {
          email: email,
          subject: subject,
          message: message
        }),
      );
}