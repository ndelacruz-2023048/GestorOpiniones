import { isValidObjectId } from 'mongoose'
import Publication from '../publications/publications.model.js'
import User, { user } from '../user/user.model.js'
import Comment from './comments.model.js'


const validateUserId =async (userId, response) => {
    if (!isValidObjectId(userId)) {
        response.status(400).send({ success: false, message: "Please give a Objects Id valid" })
        return false
    }

    let isValidUserId = await User.findOne({ _id: userId })
    if (!isValidUserId) {
        response.status(400).send({ success: false, message: "User Id is not valid" })
        return false
    }
    return true
}

export const validateCommentId = async (commentId,response)=>{
    if (!isValidObjectId(commentId)) {
        response.status(400).send({ success: false, message: "Please give a Objects Id valid" })
        return false
    }
    
    //Validamos que se una id de un comentario
    let isComentIdValid = await Comment.findOne({ _id: commentId })
    if (!isComentIdValid) {
        response.status(400).send({ success: false, message: "Comment Id is not valid" })
        return false
    }
    return true
}


export const getCommentByUser = async (request, response) => {
    try {
        let { uid } = request.user
        let comments = await Comment.find({ userId: uid }).populate("userId").populate('publicationId')
        if (comments.length === 0) {
            return response.status(404).send({ success: false, message: "You don't have comments yet!!!" })
        }
        response.status(200).send({ success: true, comments })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}


export const newComment = async (request, response) => {
    try {
        let data = request.body
        let { publicationId } = data
        
        //Validamos que se una id de una publicacion
        let isValidPublicationId = await Publication.findOne({ _id: publicationId })
        if (!isValidPublicationId) {
            return response.status(400).send({ success: false, message: "Publication Id is not valid" })
        }

        const comment = new Comment(data)
        comment.userId = request.user.uid
        comment.save()

        response.status(200).send({ success: true, message: 'Comment created', comment })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}


export const updateComment = async (request, response) => {
    try {
        let commentToUpdate = request.body
        let { commentId } = request.params
        //Validamos si el id del comentario es valido
        if(!await validateCommentId(commentId,response)) return

        let { uid } = request.user

        //Validamos si el usuario puede actualizar el comentario
        let canUserUpdateComment = await Comment.findOne({ _id: commentId, userId: uid })
        if (!canUserUpdateComment) {
            return response.status(400).send({ success: false, message: "You can't update this comment" })
        }

        //Se actualiza el comentario
        await Comment.findByIdAndUpdate(commentId, commentToUpdate)

        response.status(200).send({ success: true, message: 'Comment updated' })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}


export const deleteComment = async (request, response) => {
    try {
        let { commentId } = request.params
        let { uid } = request.user

        if(!await validateCommentId(commentId,response))return
        
        //Validamos si el usuario puede eliminar el comentario
        let canUserDeleteComment = await Comment.findOne({_id:commentId,userId:uid})

        if(!canUserDeleteComment){
            return response.status(400).send({success:false,message:"You can't delete this comment"})
        }

        await Comment.findByIdAndDelete(commentId)

        response.status(200).send({ success: true, message: 'Comment deleted' })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}