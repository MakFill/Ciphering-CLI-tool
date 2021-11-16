import { pipeline } from 'stream';
import { stdout, errorHandler } from './helpers/index.js';
import { input_stream, output_stream, getCiphersStreams } from './mainStreams/index.js';

pipeline(input_stream, ...getCiphersStreams(), output_stream, (err) => {
  if (err) {
    errorHandler(err);
  } else {
    stdout.write('Pipeline succeded');
  }
});
