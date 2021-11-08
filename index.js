import { pipeline } from 'stream';
import { errorHandler } from './errorHandler.js';
import input_stream from './inputStream.js';
import output_stream from './outputStream.js';
import getCiphersStreams from './transformStream.js';
import { stdout } from './cliTool.js';

pipeline(input_stream, ...getCiphersStreams(), output_stream, (err) => {
  if (err) {
    errorHandler(err);
  } else {
    stdout.write('Pipeline succeded');
  }
});
