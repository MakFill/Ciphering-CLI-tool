import { existsSync, open, appendFile, accessSync, constants } from 'fs';
import { Writable } from 'stream';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  findIndex,
  cli_options,
  stdout,
  stdin,
  argv,
  CustomError,
  errorHandler,
} from '../helpers/index.js';
import { getInputStream } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    open(this.filename, (err, fd) => {
      this.fd = fd;
      callback();
    });
  }
  _write(chunk, encode, callback) {
    let dataChunk;
    getInputStream() === stdin ? (dataChunk = chunk) : (dataChunk = chunk + '\n');
    appendFile(this.filename, dataChunk, callback);
    callback();
  }
}

export function getOutputStream() {
  let outputStream;
  try {
    const outputFlagIndex = findIndex(cli_options.output);
    if (outputFlagIndex) {
      const outputFileIndex = outputFlagIndex + 1;
      if (!argv[outputFileIndex]) {
        throw new CustomError('Error: output file does not exist');
      }
      const filePath = path.join(__dirname, '../', argv[outputFileIndex]);
      const existFile = existsSync(filePath);
      if (existFile) {
        try {
          accessSync(filePath, constants.R_OK | constants.W_OK);
        } catch (err) {
          throw new CustomError('Output file access denied');
        }
        outputStream = new WriteStream(filePath);
      } else {
        throw new CustomError('Error: output file does not exist');
      }
    } else {
      outputStream = stdout;
    }
  } catch (err) {
    errorHandler(err);
  }

  return outputStream;
}
