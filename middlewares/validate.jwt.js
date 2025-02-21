import jwt from 'jsonwebtoken'

export const validateJwt = async(request,response,next)=>{
    try {
        let {authorization} = request.headers

        if(!authorization){
            return response.status(400).send({success:true,message:'Please provide a token'})
        }
        
        let userData = jwt.verify(authorization,process.env.SECRET_KEY)

        if(!userData){
            return response.status(400).send({success:false,message:'Token invalid'})
        }
        request.user = userData
        next()
    } catch (error) {
        response.status(500).send({success:false,message:"Internal server error"})
    }
}