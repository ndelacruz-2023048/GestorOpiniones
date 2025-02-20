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
        const categoriesToCheck = ["Reflexion","Pregunta/Debate","Noticia","Humor","Recomendacion","Anuncio"]
        const categories = await Category.find({name:{$in:categoriesToCheck}})
        if(categories.length === 0){
            const data = [
                {name:"Reflexion",description:"Publicaciones que invitan a pensar sobre un tema, pueden ser experiencias personales, frases motivacionales o mensajes espirituales.",isDefault:true},
                {name:"Pregunta/Debate",description:"Publicaciones que buscan la opinión de otros usuarios sobre un tema específico, fomentando la discusión o el intercambio de ideas.",isDefault:true},
                {name:"Noticia",description:" Información actual sobre eventos, sucesos o novedades relevantes en distintos ámbitos (política, tecnología, deportes, etc.).",isDefault:true},
                {name:"Humor",description:"Contenido divertido como chistes, memes o anécdotas graciosas para entretener a los seguidores.",isDefault:true},
                {name:"Recomendacion",description:"Sugerencias o consejos sobre productos, servicios, lugares, libros, películas u otras experiencias.",isDefault:true},
                {name:"Anuncio",description:"Publicaciones con información importante sobre eventos, negocios, productos o cualquier tipo de promoción.",isDefault:true}
            ]
            await Category.insertMany(data) 
            console.log('Created default categories')
            return true
        }        
    } catch (error) {
        console.error('Default categories creation failed',error)
    }
}
