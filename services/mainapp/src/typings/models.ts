export class DirectusUser{
    fullName : string  
    email : string 
    avatar: string | undefined 
    phoneNumber : string | undefined 
    gender : string | undefined 
    constructor(email: string , fullName: string, avatar?: string , phoneNumber? : string , gender? : string){
        this.fullName = fullName
        this.email = email
        this.avatar = avatar
        this.phoneNumber = phoneNumber
        this.gender = gender
    }
}


