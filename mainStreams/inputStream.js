import { existsSync, open, read, close } from 'fs';
import { Readable } from 'stream';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  findIndex,
  cli_options,
  stdin,
  argv,
  CustomError,
  errorHandler,
} from '../helpers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    open(this.filename, (err, fd) => {
      if (err) {
        callback(errorHandler(new CustomError('Input file access denied')));
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        errorHandler(new CustomError('Input file access denied'));
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

export function getInputStream() {
  let inputStream;
  try {
    const inputFlagIndex = findIndex(cli_options.input);
    if (inputFlagIndex) {
      const inputFileIndex = inputFlagIndex + 1;
      if (!argv[inputFileIndex]) {
        throw new CustomError('Error: input file does not exist');
      }
      const filePath = path.join(__dirname, '../', argv[inputFileIndex]);
      const existFile = existsSync(filePath);
      if (existFile) {
        inputStream = new ReadStream(filePath);
      } else {
        throw new CustomError('Error: input file does not exist');
      }
    } else {
      inputStream = stdin;
    }
    return inputStream;
  } catch (err) {
    errorHandler(err);
  }
}
