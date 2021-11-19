import { existsSync, open, appendFile, close } from 'fs';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    open(this.filename, (err, fd) => {
      if (err) {
        errorHandler(new CustomError('Output file access denied'));
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encode, callback) {
    let dataChunk;
    getInputStream() === stdin ? (dataChunk = chunk) : (dataChunk = chunk + '\n');
    appendFile(this.filename, dataChunk, (err) => {
      if (err) {
        errorHandler(new CustomError('Output file access denied'));
      }
    });
    callback();
  }
  _destroy(err, callback) {
    if (this.fd) {
      close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
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
