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
      if (req.query) {
        console.log(req.query)
        this.getGamesByDate(req, res, next)
        return
      } 
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
  async getGamesByDate (req: Request, res: Response, next: NextFunction) {
    try {
        const data:Games = await getAllGames(req.token)
        for (const game of data.games) {
          const game2:Game = game
          console.log(game.start_date_time)
        }
        res.status(200).json({ data })
      } catch (err: any) {
        let error = createError(404)
        console.log('ERROR IN GAMES BY DATE')
        next(error)
      }
}
}
