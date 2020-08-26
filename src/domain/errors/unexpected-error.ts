export class UnexpectedError extends Error {
  constructor() {
    super('Something went wrong. Try Again');
    this.name = 'UnexpectedError';
  }
}
