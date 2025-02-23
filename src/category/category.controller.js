import { isValidObjectId } from 'mongoose'
import Category from './category.model.js'
import Publication from '../publications/publications.model.js'

const validCategoryId = async(categoryId,response)=>{
    //Validamos si es una id valid
    if(!isValidObjectId(categoryId)){
        response.status(400).send({sucess:false,message:"Please give a Object Id valid"})
        return false
    }
    
    //Validamos si es una id de una categoria
    const category = await Category.findOne({_id:categoryId})
    if(!category){
        response.status(404).send({sucess:false,message:"Category Id is not valid"})
        return false
    }

    return true
}

export const getCategories = async(request,response)=>{
    try {
        const categories = await Category.find()
        if(categories.length === 0){
            return response.status(404).send({sucess:false,message:"No categories found"})  
        }
        response.status(200).send({sucess:true,message:"Categories fetched successfully",categories})
    } catch (error) {
        response.status(500).send({sucess:false,message:"Internal Server Error",error})
    }
}   


export const newCategory = async(request,response)=>{
    try {
        const {username,email} = request.user
        const data= request.body
        const {name}= data
        //Validamos que solo el usuario admin pueda agregar nuevas categorias
        if(username !== 'admin' && email !== 'admin@gmail.com'){
            return response.status(401).send({sucess:false,message:"Unauthorized to add new categories"})
        }

        const isDuplicatedCategory = await Category.findOne({name})
        if(isDuplicatedCategory){
            return response.status(400).send({sucess:false,message:"Category already exists"})
        }

        let newCategory = new Category(data)
        newCategory.save()

        response.status(200).send({sucess:true,message:"Category added successfully"})
    } catch (error) {
        response.status(500).send({sucess:false,message:"Internal Server Error",error})
    }
}

export const updateCategory = async(request,response)=>{
    try {
        const {categoryId} = request.params
        const {username,email} = request.user
        const data = request.body
        //Validamos que solo el usuario admin pueda agregar nuevas categorias
        if(username !== 'admin' && email !== 'admin@gmail.com'){
            return response.status(401).send({sucess:false,message:"Unauthorized to update new categories"})
        }
        
        //Verificamos si es una id y un id de una categoria valida
        if(! await validCategoryId(categoryId,response)) return 

        const category = await Category.findOne({_id:categoryId})
        const {name}= category
        if(name === 'Categoria por Defecto'){
            return response.status(400).send({sucess:false,message:"You can't update the default category"})
        }

        await Category.findByIdAndUpdate(categoryId,data)

        response.status(200).send({sucess:true,message:"Category updated successfully"})
    } catch (error) {
        response.status(500).send({sucess:false,message:"Internal Server Error",error})
    }
}

export const deleteCategory = async(request,response)=>{
    try {

        const {categoryId} = request.params
        const {username,email} = request.user

        //Validamos que solo el usuario admin pueda agregar nuevas categorias
        if(username !== 'admin' && email !== 'admin@gmail.com'){
            return response.status(401).send({sucess:false,message:"Unauthorized to delete new categories"})
        }
        
        //Verificamos si es una id y un id de una categoria valida
        if(! await validCategoryId(categoryId,response)) return 

        const category = await Category.findOne({_id:categoryId})
        const {name}= category
        if(name === 'Categoria por Defecto'){
            return response.status(400).send({sucess:false,message:"You can't delete the default category"})
        }

        const categoryDefault = await Category.findOne({name:"Categoria por Defecto"})

        //Actualizamos las publicaciones que estan relacionadas con la categoria a eliminar
        const publicationsRelationatedWithCategory = await Publication.updateMany({categoryId},{categoryId:categoryDefault._id})

        await Category.findByIdAndDelete(categoryId)


        response.status(200).send({sucess:true,message:"Category deleted successfully",category})
    } catch (error) {
        response.status(500).send({sucess:false,message:"Internal Server Error",error})
    }
}

export const defaultCategories = async()=>{
    try {
        const categoriesToCheck = ["Categoria por Defecto"]
        const categories = await Category.find({name:{$in:categoriesToCheck}})
        if(categories.length === 0){
            const data = {name:"Categoria por Defecto",description:"Publicaciones que invitan a pensar sobre un tema, pueden ser experiencias personales, frases motivacionales o mensajes espirituales."}
            let newCategory = new Category(data)
            newCategory.save()
            console.log('Created default categories')
            return true
        }        
    } catch (error) {
        console.error('Default categories creation failed',error)
    }
}
