import { readItems } from "@directus/sdk";
import { directusInstance } from "../services/directus";

export async function getAllAccounts(uid : string){
    return (await directusInstance.request(
       readItems('account', {
         filter: {
           user_id: uid
         },
       }),
     )) || []
}

export async function getAccountByName(name : string){
    return (await directusInstance.request(
       readItems('account', {
         filter: {
           name : name
         },
       }),
     )) || []
}
