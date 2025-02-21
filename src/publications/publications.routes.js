import { Router } from "express"
import { deletePublication, getPublications,newPublication,updatePublication} from "./publications.controller.js"
import { registerPublication, updateValidPublication } from "../../middlewares/validators.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const apiPublications = Router()

apiPublications.get('/publications',getPublications)
apiPublications.post('/publications_save',validateJwt,registerPublication,newPublication)
apiPublications.put('/publications_update/:publicationId',validateJwt,updateValidPublication,updatePublication)
apiPublications.delete('/publications_delete/:publicationId',validateJwt,deletePublication)

export default apiPublications
