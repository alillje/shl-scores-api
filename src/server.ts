import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import cors from 'cors'
import { Request, Response,  } from 'express'


async function start() {
  try {

    const app = express()

    app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
      // optionSuccessStatus: 200
    }))
  

    // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
    app.use(helmet())

    // Set up a morgan logger using the dev format for log entries.
    app.use(logger('dev'))

    // Parse requests of the content type application/json.
    app.use(express.json())

    // Register routes.
    app.use('/', router)

    // Error handler.
    app.use(function (err: any, req: Request, res: Response) {
      err.status = err.status || 500
      // Set error messages depending on status code
      if (err.status === 500) {
        err.message = 'An unexpected condition was encountered.'
      } else if (err.status === 403) {
        err.message = 'Invalid access token.'
      }

      if (req.app.get('env') !== 'development') {
        return res
          .status(err.status)
          .json({
            status: err.status,
            message: err.message
          })
      }

      // Dev only
      // Only providing detailed error in development.
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message,
          cause: err.cause
            ? {
                status: err.cause.status,
                message: err.cause.message,
                stack: err.cause.stack
              }
            : null,
          stack: err.stack
        })
    })

    // Starts the HTTP server listening for connections.
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`)
      console.log('Press Ctrl-C to terminate...')
    })
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

start()