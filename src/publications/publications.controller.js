import Publication from './publications.model.js'
import Category from '../category/category.model.js'
import { isValidObjectId } from 'mongoose'

export const getPublications = async(request, response)=>{
    try {
        const publications = await Publication.find()
        if(publications.length === 0){
            return response.status(404).send({success:false,message:'No publications found'})
        }
        response.status(200).send({success:true,message:'Publications found',data:publications})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error',error})
    }
}

export const newPublication = async(request,response)=>{
    try {
        const data = request.body
        const {title,mainText,categoryId} = data
        const isValidCategoryId = await Category.findOne({_id:categoryId})
        if(!isValidCategoryId){
            return response.status(400).send({success:false,message:'Invalid category'})
        }
        const publication = new Publication(data)
        await publication.save()
        response.status(201).send({success:true,message:'Publication created',data:publication})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error',error})
    }
}

export const updatePublication = async(request,response)=>{
    try {
        const dataToUpdate= request.body
        const {publicationId} = request.params

        //Validamos si es una id valid
        if(!isValidObjectId(publicationId)){
            return response.status(400).send({success:false,message:"Please give a Object Id valid"})
        }
        
        //Validamos que se una id de una publicacion
        let isValidPublicationId = await Publication.findOne({_id:publicationId})
        if(!isValidPublicationId){
            return response.status(400).send({success:false,message:"Publication Id is not valid"})
        }
        
        //Validamos que no venga el atributo categoryId
        if ("categoryId" in dataToUpdate){
            return response.status(400).send({sucess:false,message:"You can't update the atribute categoryId"})
        }
    
        let publicationUpdated = await Publication.findByIdAndUpdate(publicationId,dataToUpdate)

        response.status(200).send({success:true,message:"Publication updated succesfully!!!",publicationUpdated})
    } catch (error) {
        response.status(500).send({success:false,message:"Internal server error"},error)
    }
}

export const deletePublication = async(request,response)=>{
    try {
        let {publicationId} = request.params

        //Validamos si es una id valid
        if(!isValidObjectId(publicationId)){
            return response.status(400).send({success:false,message:"Please give a Object Id valid"})
        }
        
        //Validamos que se una id de una publicacion
        let isValidPublicationId = await Publication.findOne({_id:publicationId})
        if(!isValidPublicationId){
            return response.status(400).send({success:false,message:"Publication Id is not valid"})
        }

        //Validamos que el usuario no tenga publicaciones
        let publicationsByUser = await Publication.find({userId:request.user.uid})
        // console.log(publicationsByUser)
        if(publicationsByUser.length ===0){
            return response.status(400).send({success:false,message:"You don't have publications yet!!!"})
        }

        let isAuthorizedToDeleteCategory = await Publication.findOne({_id:publicationId,userId:request.user.uid})
        if(!isAuthorizedToDeleteCategory){
            return response.status(400).send({success:false,message:'You are not authorized to delete this publication'})
        }

        let publicationDeleted = await Publication.findByIdAndDelete(publicationId)

        response.status(200).send({success:true,message:"Publication deleted succesfully!!!",publicationDeleted})
    } catch (error) {
        response.status(500).send({success:false,message:"Internval server error",error})
    }
}