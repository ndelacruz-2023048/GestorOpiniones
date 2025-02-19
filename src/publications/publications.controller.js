import Publication from './publications.model.js'

export const getPublications = async(request, response)=>{
    try {
        const publications = await Publication.find()
        response.status(200).send({success:true,message:'Publications found',data:publications})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error',error})
    }
}