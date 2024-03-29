import { AtbashStream, EncodeStream, DecodeStream } from './index.js';
import { errorHandler, CustomError } from '../errorHandler.js';

export function selectCipherStream(elem) {
  try {
    switch (elem) {
      case 'A':
        return new AtbashStream();
      case 'C1':
        return new EncodeStream('caesar');
      case 'C0':
        return new DecodeStream('caesar');
      case 'R1':
        return new EncodeStream('rot');
      case 'R0':
        return new DecodeStream('rot');
      default:
        throw new CustomError('Error: wrong config option');
    }
  } catch (err) {
    errorHandler(err);
  }
}
