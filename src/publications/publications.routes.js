import { Router } from "express"
import { getPublications,newPublication,updatePublication} from "./publications.controller.js"
import { registerPublication } from "../../middlewares/validators.js"

const apiPublications = Router()

apiPublications.get('/publications',getPublications)
apiPublications.post('/publications_save',registerPublication,newPublication)
apiPublications.put('/publications_update',updatePublication)

export default apiPublications
