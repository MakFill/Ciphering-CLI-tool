import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { DecodeStream } from '../cipherStreams/index.js';

describe('Decode streams', () => {
  const testString = 'test';
  const decodeCaesarTestString = 'sdrs';
  const decodeROTTestString = 'lwkl';

  test('Is Caesar instance workes properly', () => {
    const transform = new DecodeStream('caesar', { objectMode: true });
    const reader = new ObjectReadableMock(testString);
    const writer = new ObjectWritableMock();

    reader.pipe(transform).pipe(writer);
    writer.on('finish', () => {
      expect(writer.data.join('')).toBe(decodeCaesarTestString);
    });
  });

  test('Is ROT instance workes properly', () => {
    const transform = new DecodeStream('rot', { objectMode: true });
    const reader = new ObjectReadableMock(testString);
    const writer = new ObjectWritableMock();

    reader.pipe(transform).pipe(writer);
    writer.on('finish', () => {
      expect(writer.data.join('')).toBe(decodeROTTestString);
    });
  });
});
