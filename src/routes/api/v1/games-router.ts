/**
 * Games routes.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */
import express from 'express'
import { GameController } from '../../../controllers/api/game-controller.js'
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export const router = express.Router()

const controller = new GameController()


/**
 * Auth.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
// const authClient = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         const data = { 'client_id': process.env.CLIENT_ID as string, 
//         'client_secret': process.env.CLIENT_SECRET as string,
//         'grant_type': 'client_credentials' }
//         const options = {
//           method: 'POST',
//           data: qs.stringify(data),
//           url: process.env.API_AUTH_URL
//         }
//         const response = await axios(options)
//         if (response.status !== 200) {
//             const error = createError(401)
//             next(error)
//         }
//         // Set properties to req.user from JWT payload
//         req.token = response.data.access_token
//         next()
//     }
//     catch (err: any) {
//         const error = createError(401)
//         err.message = 'Invalid access token'
//         error.cause = err
//         next(error)
//     }
// }
// router.get('/', authClient, (req, res, next) => controller.getGames(req, res, next))

/**
 * Sets the access token as property on the request object.
 *
 */
const setAccessToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Missing authorization header.')
          }

        const [authenticationScheme, token] = req.headers.authorization.split(' ')

        if (authenticationScheme !== 'Bearer') {
          throw new Error('Invalid authentication scheme.')
        }
        req.accessToken = token
        next()
    }
    catch (err: any) {
        const error = createError(403)
        err.message = 'Invalid access token'
        error.cause = err
        next(error)
    }
}

router.get('/', setAccessToken, (req, res, next) => controller.getGames(req, res, next))
