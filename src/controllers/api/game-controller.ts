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
   */
  async getGames (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.start) {
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
   * Gets data for a single game based on query 'start', indicating the start date.
   */
  async getGamesByDate (req: Request, res: Response, next: NextFunction) {
    try {
        const games:Game[] = await getAllGames(req.token)
        const gamesByQuery:Game[] = []
        // Iterate through games, check if date matches query 'start', add matching games
        for (const game of games) {
          game.start_date_time.substring(0, 10) === req.query.start && gamesByQuery.push(game)
        }
        res.status(200).json({ gamesByQuery })
      } catch (err: any) {
        console.log(err)
        let error = createError(404)
        console.log('ERROR IN GAMES BY DATE')
        next(error)
      }
}

}
