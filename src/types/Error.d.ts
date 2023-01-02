    interface ExpressError {
    status?: number | undefined,
    message: string,
    cause: {
        status?: number,
        message: string,
        stack: string
    },
    code: number
}