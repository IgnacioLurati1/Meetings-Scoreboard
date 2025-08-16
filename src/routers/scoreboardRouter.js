import { Router } from 'express'

import {getOne, getAll, update, remove, create} from '../controlers/loginController.js'

const router = Router()

router.get('/scoreboard/:surname', getOne);
router.get('/scoreboard', getAll);
router.post('/scoreboard', create);
router.update('/scoreboard/:surname', update);
router.delete('/scoreboard/:surname', remove);

