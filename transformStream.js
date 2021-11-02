import { Transform } from 'stream';

class TransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    // if(encoding === 'utf8') {
      console.log(encoding)
      console.log('CHUNK', chunk)
      // this.push(chunk.toUpperCase());
      const resultString = chunk.toString().toUpperCase();
      callback(null, resultString);
  }
}

const transform_stream = new TransformStream();

export default transform_stream;