import { findIndex, cli_options, argv, CustomError, errorHandler } from '../helpers/index.js';
import { selectCipherStream } from '../cipherStreams/index.js';

export function getCipherStreams() {
  try {
    const configFlagIndex = findIndex(cli_options.config);
    if (!configFlagIndex) {
      throw new CustomError('Error: Config option is required');
    }
    const cipherIndex = configFlagIndex + 1;
    if (!argv[cipherIndex]) {
      throw new CustomError('Error: Config option is required');
    }
    const cipherString = argv[cipherIndex].split('-');
    return cipherString.map((elem) => {
      try {
        return selectCipherStream(elem);
      } catch (err) {
        errorHandler(err);
      }
    });
  } catch (err) {
    errorHandler(err);
  }
}
