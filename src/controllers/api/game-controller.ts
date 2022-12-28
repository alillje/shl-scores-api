/**
 * Module for the AccountController.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

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
  async getSingleGame (req: Request, res: Response, next: NextFunction) {
    try {
      let game:string = 'test'

      res.status(201).json({ game })
    } catch (err: any) {
      let error = err
      next(error)
    }
  }

}
