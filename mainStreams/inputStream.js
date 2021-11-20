import { existsSync, open, read, accessSync, constants } from 'fs';
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

const __dirname = dirname(fileURLToPath(import.meta.url));

export class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    open(this.filename, (err, fd) => {
      this.fd = fd;
      callback();
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
    });
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
        try {
          accessSync(filePath, constants.R_OK);
        } catch (err) {
          throw new CustomError('Input file access denied');
        }
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
