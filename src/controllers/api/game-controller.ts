/**
 * Module for the AccountController.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { getAllGames } from '../../services/axios.js'
import { getGamesByDate, getPlayedGames, getActiveGames } from '../../utils/query-functions.js'



/**
 * Encapsulates a controller.
 */
export class GameController {
  /**
   * Gets data for games.
   */
  async getGames (req: Request, res: Response, next: NextFunction) {
    try {
      let games = await getAllGames(req.token)

      if (req.query.start) {
        games = getGamesByDate(games, req.query.start.toString())
      } else if (req.query.active === 'true' || req.query.active === 'false') {
        games = getActiveGames(games, req.query.active)
      } else if (req.query.played === 'true' || req.query.played === 'false') {
        games = getPlayedGames(games, req.query.played)
      } 
  
      res.status(200).json({ games })
    } catch (err: any) {
      const error = createError(403)
      next(error)
    }
  }

}
