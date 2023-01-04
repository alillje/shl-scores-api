/**
 * Module for the AccountController.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { getAllGames, getSingleGame } from '../../services/axios.js'
import { getGamesByDate, getPlayedGames, getActiveGames } from '../../utils/query-functions.js'


/**
 * Encapsulates a controller.
 */
export class GameController {

  async loadGame (req: Request, res: Response, next: NextFunction) {
    try {
      const game = await getSingleGame(req.accessToken, req.params.id)
      if (!game) {
        const error = createError(404)
        next(error)
        return
      }
      req.game = game

      next()
    } catch (err) {
      next(err)
      }
    }
  /**
   * Gets data for games.
   */
  async getGames (req: Request, res: Response, next: NextFunction) {
    try {
      let games = await getAllGames(req.accessToken)

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

    /**
   * Gets data for a single game based on ID.
   */
    async getGame (req: Request, res: Response, next: NextFunction) {
      try {
        // const game = req.game
        const game = await getSingleGame(req.accessToken, req.params.id)
        if (!game) {
          const error = createError(404)
          next(error)
          return
        }
        res.status(200).json({ game })
      } catch (err: any) {
        const error = createError(403)
        next(error)
      }
    }
  

}
