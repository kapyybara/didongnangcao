import { realm } from "../services/realm"

export const getProfile = async () => {
    const profile = realm.objects('AppProfile')

    return Promise.resolve(profile)
}

export const saveProfile = async (email: string, password: string) => {
    const profiles = realm.objects('AppProfile')
    console.log(profiles)
    return new Promise((resolve, reject) => {
        realm.write(() => {
            realm.create('AppProfile', {
                email: email , 
                password: password
            })
            resolve(profiles)
        })
    })
}

export const removeProfile = async () => {
    const profiles = realm.objects('AppProfile'); 
    console.log(profiles)
    return new Promise(resolve => {
        realm.write(() => {
            realm.delete(profiles)
            resolve(profiles)
        })
    })
}
