import jwt from 'jsonwebtoken'

export const validateJwt = async(request,response,next)=>{
    try {
        let {authorization} = request.headers

        if(!authorization){
            return response.status(400).send({success:true,message:'Please login first'}) 
        }
        
        let userData

        try {
            userData = jwt.verify(authorization,process.env.SECRET_KEY)
        } catch (error) {
            return response.status(403).json({
                success: false,
                message: 'El token es inválido o ha expirado. Inicia sesión de nuevo.'
            });
        }

        if(!userData){
            return response.status(400).send({success:false,message:'Token invalid'})
        }
        request.user = userData
        next()
    } catch (error) {
        response.status(500).send({success:false,message:"Internal server error"})
    }
}