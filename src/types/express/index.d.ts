export {}


declare global {
    namespace Express {
        interface Request {
            accessToken: string,
            game: GameDetailed
        }
    }
}

