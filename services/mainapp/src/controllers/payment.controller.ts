import { createItems, readItem, updateItem } from "@directus/sdk";
import { directusInstance } from "../services/directus";


export async function updatePayment(id: string , type: string, name: string, total: number, cycle_day: number, from: Date, to: Date, category: string, description: string, addAutomation : boolean, account: string) {
    console.log({
        id, name , account
    })
    return await directusInstance.request(
        updateItem('payment', id,{
            type: type,
            name: name,
            total: total,
            cycle_day: cycle_day,
            description: description,
            category: category,
            from: from,
            to: to,
            add_automation : addAutomation,
            account_id: {
                id: account
            }
        }),
    )
}
export async function createPayment(type: string, name: string, total: number, cycle_day: number, from: Date, to: Date, category: string, description: string, addAutomation : boolean, account: string) {
    return await directusInstance.request(
        createItems('payment', {
            type: type,
            name: name,
            total: total,
            cycle_day: cycle_day,
            description: description,
            category: category,
            from: from,
            to: to,
            add_automation : addAutomation,
            account_id: account
        }),
    )
}

export async function getPayment(id : string){
    return await directusInstance.request(
       readItem('payment', id),
     )
}
