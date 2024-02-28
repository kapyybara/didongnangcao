import Realm from 'realm'

const ProfileSchema = {
    name: 'AppProfile',
    properties: {
        email: 'string',
        password: 'string',
    }
}

export const realm = new Realm({
    schema: [ProfileSchema] , 
    schemaVersion: 1.
})