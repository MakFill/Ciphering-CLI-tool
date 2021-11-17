import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { EncodeStream } from '../cipherStreams/index.js';

describe('Encode streams', () => {
  const testString = 'test';
  const encodedCaesarTestString = 'uftu';
  const encodedROTTestString = 'bmab';

  test('Is Caesar instance workes properly', () => {
    const transform = new EncodeStream('caesar', { objectMode: true });
    const reader = new ObjectReadableMock(testString);
    const writer = new ObjectWritableMock();

    reader.pipe(transform).pipe(writer);
    writer.on('finish', () => {
      expect(writer.data.join('')).toBe(encodedCaesarTestString);
    });
  });

  test('Is ROT instance workes properly', () => {
    const transform = new EncodeStream('rot', { objectMode: true });
    const reader = new ObjectReadableMock(testString);
    const writer = new ObjectWritableMock();

    reader.pipe(transform).pipe(writer);
    writer.on('finish', () => {
      expect(writer.data.join('')).toBe(encodedROTTestString);
    });
  });
});
