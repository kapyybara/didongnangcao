export class DirectusUser{
    full_name : string  
    email : string 
    avatar: string | undefined 
    phone_number : string | undefined 
    gender : string | undefined 
    id : string
    constructor(id: string , email: string , full_name: string, avatar?: string , phone_number? : string , gender? : string){
        this.full_name = full_name
        this.email = email
        this.avatar = avatar
        this.phone_number = phone_number
        this.gender = gender
        this.id = id 
    }
}


