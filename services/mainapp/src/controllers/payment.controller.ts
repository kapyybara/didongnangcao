import { createItems, updateItem } from "@directus/sdk";
import { directusInstance } from "../services/directus";

// export async function updatePayment(payment){
//     return await directusInstance.request(
//       updateItem('app_user', user.id, {
//         full_name : user.full_name,
//         phone_number : user.phone_number, 
//         gender : user.gender
//       }),
//     )
//   }

export async function createPayment(type: string, name: string, total: number, cycle_day: number, from: Date, to: Date, category: string, description: string) {
    return await directusInstance.request(
        createItems('payment', {
            type: type,
            name: name,
            total: total,
            cycle_day: cycle_day,
            description: description,
            category: category,
            from: from,
            to: to
        }),
    )
}