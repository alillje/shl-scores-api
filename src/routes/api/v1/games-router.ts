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
import axios from 'axios'
import qs from 'qs';



export const router = express.Router()

const controller = new GameController()


/**
 * Auth.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authClient = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const data = { 'client_id': process.env.CLIENT_ID as string, 
        'client_secret': process.env.CLIENT_SECRET as string,
        'grant_type': 'client_credentials' };
        const options = {
          method: 'POST',
          data: qs.stringify(data),
          url: process.env.API_AUTH_URL
        };
        const response = await axios(options);
        if (response.status !== 200) {
            let error = createError(401)
            next(error)
        }
        // Set properties to req.user from JWT payload
        req.token = response.data.access_token
        next();
    }
    catch (err: any) {
        const error = createError(401);
        err.message = 'Invalid access token';
        error.cause = err;
        next(error);
    }
};
// Provide req.user to the route if :id is present in the route path.
// router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id));

// Provide req.user to the route if :id is present in the route path.
// router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))
router.get('/', authClient, (req, res, next) => controller.getGames(req, res, next))
router.get('/:id', (req, res, next) => controller.getSingleGame(req, res, next))