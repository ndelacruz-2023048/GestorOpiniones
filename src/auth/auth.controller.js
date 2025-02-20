import { encrypt, verifyPassword } from "../../utils/encrypt.js"
import { generateJwt } from "../../utils/jwt.js"
import User, { user } from "../user/user.model.js"

export const register =async (request,response)=>{
    try {
        const data = request.body

        //Validamos el atributo rol, si es que es enviado
        if('role' in data){
            if(data.role !== 'admin' && data.role !== 'client'){
                return response.status(400).send({success:false,message:'Role invalid'})
            }
        }

        //Validamos que el usuario no pueda colocarse como rol:admin
        if(data.role === 'admin'){
            return response.status(400).send({success:false,message:'Unauthorized to register as Admin'})
        }

        //Verificamos que el username y email no sean duplicados
        const isDuplicatedCredentials = await User.findOne({$or:[{email:data.email},{username:data.username}]})

        if(isDuplicatedCredentials){
            return response.status(400).send({success:false,message:"Credentials duplicated"})
        }

        //Guardamos el usuario
        const client = new User(data)
        client.password = await encrypt(data.password)
        client.save()
        response.status(200).send({success:true,message:'Register successfully'})
    } catch (error) {
        response.status(500).send({success:false,message:"Server internal error",error})
    }
}


export const login = async (request,response)=>{
    try {
        let {userloggin,password} = request.body
        const dataUser = await User.findOne({$or:[{username:userloggin},{email:userloggin}]})
        if(dataUser){
            let  isValidPassword = await verifyPassword(dataUser.password,password)
            if(isValidPassword){
                let userPayload = {
                    name:dataUser.name,
                    age:dataUser.age,
                    email:dataUser.email,
                    username:dataUser.username
                }
                let token = await generateJwt(userPayload)
                return response.status(200).send({success:true,message:"Welcome to the Opinions Gestion",token})
            }
        }

        response.status(400).send({success:false,message:'Credentials invalid'})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error',error})
    }
}