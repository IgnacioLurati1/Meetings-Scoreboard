import { Router } from 'express'

import {getOne, getAll, update, remove, create} from '../controlers/scoreboardController.js'

const router = Router()

router.get('/:surname', getOne);
router.get('/', getAll);
router.post('/', create);
router.put('/:surname', update);
router.patch('/:surname', update);
router.delete('/:surname', remove);

export default router;