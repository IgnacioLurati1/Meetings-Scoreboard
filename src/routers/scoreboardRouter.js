import { Router } from 'express';
import { verifyToken } from '../config/middlewares.js';
import {
  getOne,
  getAll,
  update,
  remove,
  create
} from '../controlers/scoreboardController.js';

const router = Router();

/**
 * @openapi
 * /api/scoreboard/{surname}:
 *   get:
 *     summary: Get a scoreboard entry by surname
 *     tags:
 *       - Scoreboard
 *     parameters:
 *       - name: surname
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The surname of the player
 *     responses:
 *       200:
 *         description: Successfully retrieved entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                  type: string
 *                  example: extWR313115
 *                 name:
 *                  type: string
 *                  example: John
 *                 surname:
 *                   type: string
 *                   example: Doe
 *                 middlename:
 *                   type: string
 *                   example: Michael
 *                 score:
 *                   type: integer
 *                   example: 100
 */
router.get('/:surname', getOne);

/**
 * @openapi
 * /api/scoreboard:
 *   get:
 *     summary: Get all scoreboard entries
 *     tags:
 *       - Scoreboard
 *     responses:
 *       200:
 *         description: A list of scoreboard entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surname:
 *                     type: string
 *                     example: Doe
 *                   score:
 *                     type: integer
 *                     example: 100
 */
router.get('/', getAll);

/**
 * @openapi
 * /api/scoreboard:
 *   post:
 *     summary: Create a new scoreboard entry
 *     tags:
 *       - Scoreboard
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *             properties:
 *               id:
 *                 type: string
 *                 example: extWR313115
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               middlename:
 *                 type: string
 *                 example: Michael
 *               score:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Successfully created entry
 */
router.post('/', verifyToken, create);

/**
 * @openapi
 * /api/scoreboard/{surname}:
 *   put:
 *     summary: Partially update a scoreboard entry by surname
 *     tags:
 *       - Scoreboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: surname
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *             properties:
 *               id:
 *                 type: string
 *                 example: extWR313115
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               middlename:
 *                 type: string
 *                 example: Michael
 *               score:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Successfully updated entry
 */

router.put('/:surname', verifyToken, update);

/**
 * @openapi
 * /api/scoreboard/{surname}:
 *   patch:
 *     summary: Partially update a scoreboard entry by surname
 *     tags:
 *       - Scoreboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: surname
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surname
 *             properties:
 *               id:
 *                 type: string
 *                 example: extWR313115
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               middlename:
 *                 type: string
 *                 example: Michael
 *               score:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Successfully updated entry
 */

router.patch('/:surname', verifyToken, update);

/**
 * @openapi
 * /api/scoreboard/{surname}:
 *   delete:
 *     summary: Delete a scoreboard entry by surname
 *     tags:
 *       - Scoreboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: surname
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted entry
 */
router.delete('/:surname', verifyToken, remove);

export default router;
