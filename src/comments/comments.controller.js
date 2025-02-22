import { isValidObjectId } from 'mongoose'
import Publication from '../publications/publications.model.js'
import User from '../user/user.model.js'
import Comment from './comments.model.js'

export const newComment = async (request, response) => {
    try {
        let data = request.body
        let {userId,publicationId } = data

        //Validamos si el id de la publicacion es valido
        if (!isValidObjectId(publicationId) || !isValidObjectId(userId)) {
            return response.status(400).send({ success: false, message: "Please give a Objects Id valid" })
        }

        //Validamos que se una id de un usuario
        let isValidUserId = await User.findOne({ _id: userId })
        if (!isValidUserId) {
            return response.status(400).send({ success: false, message: "User Id is not valid" })
        }

        //Validamos que se una id de una publicacion
        let isValidPublicationId = await Publication.findOne({ _id: publicationId })
        if (!isValidPublicationId) {
            return response.status(400).send({ success: false, message: "Publication Id is not valid" })
        }

        const comment = new Comment(data)
        comment.save()

        response.status(200).send({ success: true, message: 'Comment created' })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}