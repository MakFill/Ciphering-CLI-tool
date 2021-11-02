import { pipeline } from 'stream';
import input_stream from './inputStream.js';
import output_stream from './outputStream.js';
import transform_stream from './transformStream.js';

pipeline(input_stream, transform_stream, output_stream, (err) => {
    if (err) {
      process.stderr('Pipeline failed: ', err);
      process.exit(1);
    }
    else {
      console.log('Pipeline succeded')
    };
  });

