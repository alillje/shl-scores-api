 /**
 * Module for handling URL Queries.
 *
 * @author Andreas Lillje
 * @version 1.0.0
 */
 
 /**
   * Gets data for a single game based on query 'start', indicating the start date.
   */
export function getGamesByDate (allGames:Game[], startDate:string) {
    const games:Game[] = []
    // Iterate through games, check if date matches query 'start', add matching games
    for (const game of allGames) {
      game.start_date_time.substring(0, 10) === startDate && games.push(game)
    }
    return games
  }

/**
* Gets data for a single game based on ID.
*
* @param {object} req - Express request object.
* @param {object} res - Express response object.
* @param {Function} next - Express next middleware function.
*/
export function getActiveGames (allGames:Game[], active:string) {
    const games:Game[] = []
    // Iterate through games, check if date matches query 'start', add matching games
    for (const game of allGames) {
      if (active === 'true' && game.live_coverage_enabled) {
        games.push(game)
      } else if (active === 'false' && !game.live_coverage_enabled) {
        games.push(game)
      }
    }
    return games
    }

/**
* Gets data for a single game based on ID.
*
* @param {object} req - Express request object.
* @param {object} res - Express response object.
* @param {Function} next - Express next middleware function.
*/
export function getPlayedGames (allGames:Game[], played:string) {
    const games:Game[] = []
    // Iterate through games, check if date matches query 'played', add matching games
    for (const game of allGames) {
      if (played === 'true' && game.played) {
        games.push(game)
      } else if (played === 'false' && !game.played) {
        games.push(game)
      }
    }
    return games
}