/**
 * Games routes.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */
import express from 'express'
import { AuthController } from '../../../controllers/api/auth-controller.js'
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

export const router = express.Router()

const controller = new AuthController()

const checkFields = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.client_id && !req.body.client_secret) {
        const error = createError(400)
        error.message = 'One or many required fields are missing'
        next(error)
        }
        next()
}

router.post('/', checkFields, (req, res, next) => controller.authorize(req, res, next))
