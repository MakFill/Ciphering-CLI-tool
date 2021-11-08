export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApplicationLogicError';
  }
}

export const errorHandler = (err) => {
  if (err instanceof CustomError) {
    process.stderr.write(err.message);
    process.exit(1);
  } else {
    throw err;
  }
};
