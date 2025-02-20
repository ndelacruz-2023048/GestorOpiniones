export const getUsers = async(request,response)=>{
    try {
        response.status(200).send({success:true,message:'All well'})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error'},error)
    }
}