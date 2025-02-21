import Category from './category.model.js'

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

export const defaultCategories = async()=>{
    try {
        const categoriesToCheck = ["Categoria por Defecto"]
        const categories = await Category.find({name:{$in:categoriesToCheck}})
        if(categories.length === 0){
            const data = {name:"Categoria por Defecto",description:"Publicaciones que invitan a pensar sobre un tema, pueden ser experiencias personales, frases motivacionales o mensajes espirituales.",isDefault:true}
            let newCategory = new Category(data)
            newCategory.save()
            console.log('Created default categories')
            return true
        }        
    } catch (error) {
        console.error('Default categories creation failed',error)
    }
}
