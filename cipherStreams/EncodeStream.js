import { Transform } from 'stream';
import {
  FIRST_LETTER_LOWER_CASE,
  FIRST_LETTER_UPPER_CASE,
  LAST_LETTER_LOWER_CASE,
  LAST_LETTER_UPPER_CASE,
  ALPHABET_LENGTH,
  ROT_SHIFT,
  CAESAR_SHIFT,
} from './cipherVariables.js';

export function implementEncode(chunk, type) {
  let resultString = '';
  const data = chunk.toString().split('');

  data.forEach((letter) => {
    let code = letter.charCodeAt();
    let codeWithShift;
    if (type === 'caesar') {
      codeWithShift = code + CAESAR_SHIFT;
    } else if (type === 'rot') {
      codeWithShift = code + ROT_SHIFT;
    }
    if (code >= FIRST_LETTER_LOWER_CASE && code <= LAST_LETTER_LOWER_CASE) {
      if (codeWithShift <= LAST_LETTER_LOWER_CASE) {
        code = codeWithShift;
      } else {
        code = codeWithShift - ALPHABET_LENGTH;
      }
    }
    if (code >= FIRST_LETTER_UPPER_CASE && code <= LAST_LETTER_UPPER_CASE) {
      if (codeWithShift <= LAST_LETTER_UPPER_CASE) {
        code = codeWithShift;
      } else {
        code = codeWithShift - ALPHABET_LENGTH;
      }
    }
    resultString += String.fromCharCode(code);
  });

  return resultString;
}

export class EncodeStream extends Transform {
  constructor(type) {
    super();
    this.type = type;
  }
  _transform(chunk, encoding, callback) {
    callback(null, implementEncode(chunk, this.type));
  }
}
