/**
 * Module for the AccountController.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import axios from 'axios'
import qs from 'qs'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  /**
   * Authorizes a client.
   */
  async authorize (req: Request, res: Response, next: NextFunction) {
    try {
        console.log('test')
        const data = { 
        'client_id': req.body.client_id, 
        'client_secret': req.body.client_secret,
        'grant_type': 'client_credentials' }
        const options = {
          method: 'POST',
          data: qs.stringify(data),
          url: process.env.API_AUTH_URL
        }
        const response = await axios(options)
        if (response.status !== 200) {
            const error = createError(403)
            next(error)
        }
        // Set properties to req.user from JWT payload
        const access_token:string = response.data.access_token
        res.status(200).json({ access_token })
    }
    catch (err: any) {
        const error = createError(403)
        err.message = 'Invalid access token'
        error.cause = err
        next(error)
    }
}
}
