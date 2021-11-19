import { pipeline } from 'stream';
import { stdout, errorHandler } from './helpers/index.js';
import { getInputStream, getOutputStream, getCipherStreams } from './mainStreams/index.js';

pipeline(getInputStream(), ...getCipherStreams(), getOutputStream(), (err) => {
  if (err) {
    errorHandler(err);
  } else {
    stdout.write('Pipeline succeded');
  }
});
