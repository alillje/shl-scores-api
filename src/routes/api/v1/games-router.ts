/**
 * Games routes.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */
import express from 'express'
import { GameController } from '../../../controllers/api/game-controller.js'

// import createError from 'http-errors'


export const router = express.Router()

const controller = new GameController()

// Provide req.user to the route if :id is present in the route path.
// router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

router.get('/:id', (req, res, next) => controller.getSingleGame(req, res, next))