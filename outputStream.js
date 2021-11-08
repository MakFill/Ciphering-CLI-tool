import { existsSync, open, appendFile, close } from 'fs';
import { Writable } from 'stream';
import { findIndex, cli_options, stdout, stdin, argv } from './cliTool.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CustomError, errorHandler } from './errorHandler.js';
import input_stream from './inputStream.js';

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
    input_stream === stdin ? (dataChunk = chunk) : (dataChunk = chunk + '\n');
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

let output_stream;
try {
  const outputFlagIndex = findIndex(cli_options.output);
  if (outputFlagIndex) {
    const outputFileIndex = outputFlagIndex + 1;
    if (!argv[outputFileIndex]) {
      throw new CustomError('Error: output file does not exist');
    }
    const filePath = path.join(__dirname, argv[outputFileIndex]);
    const existFile = existsSync(filePath);
    if (existFile) {
      output_stream = new WriteStream(filePath);
    } else {
      throw new CustomError('Error: output file does not exist');
    }
  } else {
    output_stream = stdout;
  }
} catch (err) {
  errorHandler(err);
}

export default output_stream;
