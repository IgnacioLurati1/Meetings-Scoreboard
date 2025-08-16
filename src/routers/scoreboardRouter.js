import { Router } from 'express'
import {verifyToken as verifyToken} from '../config/middlewares.js'

import {getOne, getAll, update, remove, create} from '../controlers/scoreboardController.js'

const router = Router()

router.get('/:surname', getOne);
router.get('/', getAll);
router.post('/', verifyToken, create);
router.put('/:surname', verifyToken, update);
router.patch('/:surname', verifyToken, update);
router.delete('/:surname', verifyToken, remove);

export default router;