import jwt from 'jsonwebtoken'

export const generateJwt =async (payload)=>{
    try {
        return jwt.sign(payload,process.env.SECRET_KEY,{
            algorithm:'HS256',
            expiresIn:'3h'
        })
    } catch (error) {
        console.error('Error generating jwt token',error)
    }

}