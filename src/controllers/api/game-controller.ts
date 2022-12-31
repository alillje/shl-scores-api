/**
 * Module for the AccountController.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import axios from 'axios'
import qs from 'qs';
import { getAllGames } from '../../services/axios.js'



/**
 * Encapsulates a controller.
 */
export class GameController {
  /**
   * Gets data for a single game based on ID.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getGames (req: Request, res: Response, next: NextFunction) {
    try {
      const games = await getAllGames(req.token)
      res.status(200).json({ games })
    } catch (err: any) {
      let error = createError(404)
      next(error)
    }
  }

  /**
   * Gets data for a single game based on ID.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getSingleGame (req: Request, res: Response, next: NextFunction) {
    try {
      let game:string = 'test'

      const data = { 'client_id': process.env.CLIENT_ID as string, 
      'client_secret': process.env.CLIENT_SECRET as string,
      'grant_type': 'client_credentials' };
      const options = {
        method: 'POST',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: process.env.API_AUTH_URL
      };
      const response = await axios(options);
      console.log(response);



      res.status(201).json({ response })
    } catch (err: any) {
      // let error = err
      let error = createError(404)
      next(error)
    }
  }

}
