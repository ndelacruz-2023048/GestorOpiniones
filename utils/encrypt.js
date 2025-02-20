import { hash, verify } from "argon2"

export const encrypt = async(password)=>{
    try {
        return await hash(password)
    } catch (error) {
        console.error('Error to encrypt')

    }
}

export const verifyPassword = (passwordHash,password)=>{
    try {
        return verify(passwordHash,password)
    } catch (error) {
        console.error('Error verifying password')
    }
}

