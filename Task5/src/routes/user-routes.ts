import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import {validate} from "../middleware/validate";
import userSchema from "../validations/validations";

const router = Router()

router.get('/:id', UserController.getUser)
router.post('/', validate(userSchema),  UserController.createUser)
router.put('/:id', validate(userSchema), UserController.updateUser)
router.patch('/:id', validate(userSchema), UserController.patchUser)
router.delete('/:id', UserController.deleteUser)

export default router
