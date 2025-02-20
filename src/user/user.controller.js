import { encrypt } from '../../utils/encrypt.js'
import User from './user.model.js'

export const getUsers = async(request,response)=>{
    try {
        response.status(200).send({success:true,message:'All well'})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error'},error)
    }
}

export const defaultAdmin =async ()=>{
    try {
        let existDefaultAdmin = await User.findOne({username:"admin",email:"admin@gmail.com",role:'admin'})
        if(!existDefaultAdmin){
            let data = {
                name:"Admin",
                lastname:"Admin Default",
                age:25,
                username:"admin",
                email:"admin@gmail.com",
                password:"admin196@#$",
                role:'admin'
            }
            const defaultAdmin = new User(data)
            defaultAdmin.password = await encrypt(data.password)
            defaultAdmin.save()
        }
    } catch (error) {
        console.error('Error to save default admin',error)
    }
}