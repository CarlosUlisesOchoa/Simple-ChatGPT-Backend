export class ResponseError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode

    // This line is needed in TypeScript to correctly set up the prototype chain.
    Object.setPrototypeOf(this, ResponseError.prototype)
  }
}
