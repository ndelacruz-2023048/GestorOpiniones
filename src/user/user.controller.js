import mongoose from 'mongoose'
import { encrypt, verifyPassword } from '../../utils/encrypt.js'
import User, { user } from './user.model.js'
import { contentSecurityPolicy } from 'helmet'

export const getUsers = async(request,response)=>{
    try {
        const {uid} = request.user
        const {name} = await User.findOne({_id:uid})
        let profileData = await User.findOne({_id:uid})
        
        response.status(200).send({success:true,message:`Information Profile of ${name}`,profileData})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error'},error)
    }
}

export const updateUser =async (request,response)=>{
    try {

        let data = request.body
        let {username,email,oldPassword,newPassword} = data
        let {uid}= request.user

        let isSameUser = await User.findOne({_id:uid})
        if(isSameUser.username === username || isSameUser.email === email){
            return response.status(400).send({success:false,message:`The ${isSameUser.username === username ? 'username':'email'} is the same, please change it or remove the field`})
        }

        
        //Validamos si el email es duplicado
        let isDuplicatedUsername = await User.findOne({username,_id:{$nin: request.user.uid}})
        let isDuplicatedEmail = await User.findOne({email,_id:{$nin: request.user.uid}})

        if(isDuplicatedEmail || isDuplicatedUsername){
            return response.status(400).send({success:false,message:`${isDuplicatedEmail ? 'email' : 'username'} already exists`})
        }

        //Validamos que la contraseña antigua sea correcta
        let profileUser = await User.findOne({_id:uid})
        let isValidOldPassword = await verifyPassword(profileUser.password,oldPassword)

        if(!isValidOldPassword){
            return response.status(400).send({success:false,message:'Old password is incorrect'})
        }

        //Encriptamos la nueva contraseña
        let newPasswordHash = await encrypt(newPassword)

        let userUpdated ={
            uid:request.user.uid,
            name:data.name??request.user.name,
            age:data.age??request.user.age,
            email:data.email??request.user.email,
            username:data.username??request.user.username,
        }
        request.user = userUpdated
        await User.findByIdAndUpdate(uid,{...data,password:newPasswordHash})

        
        response.status(200).send({success:true,message:'Update Profile Succesfully!!!'})
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