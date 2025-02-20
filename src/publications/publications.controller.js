import Publication from './publications.model.js'
import Category from '../category/category.model.js'

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
        
    } catch (error) {
        
    }
}