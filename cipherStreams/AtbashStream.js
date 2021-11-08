import { Transform } from 'stream';
import {
  FIRST_LETTER_LOWER_CASE,
  FIRST_LETTER_UPPER_CASE,
  LAST_LETTER_LOWER_CASE,
  LAST_LETTER_UPPER_CASE,
  ALPHABET_LENGTH,
} from './cipherVariables.js';

export class AtbashStream extends Transform {
  _transform(chunk, encoding, callback) {
    let resultString = '';
    const data = chunk.toString().split('');
    data.forEach((letter) => {
      let code = letter.charCodeAt();
      if (code >= FIRST_LETTER_LOWER_CASE && code <= LAST_LETTER_LOWER_CASE) {
        let alphabetCode = code - FIRST_LETTER_LOWER_CASE + 1;
        code = ALPHABET_LENGTH - alphabetCode + 1 + (FIRST_LETTER_LOWER_CASE - 1);
      }
      if (code >= FIRST_LETTER_UPPER_CASE && code <= LAST_LETTER_UPPER_CASE) {
        let alphabetCode = code - FIRST_LETTER_UPPER_CASE + 1;
        code = ALPHABET_LENGTH - alphabetCode + 1 + (FIRST_LETTER_UPPER_CASE - 1);
      }

      resultString += String.fromCharCode(code);
    });

    callback(null, resultString);
  }
}
