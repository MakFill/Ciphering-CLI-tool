import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { EncodeStream, implementEncode } from '../cipherStreams/index.js';

describe('Encode streams', () => {
  const testString = 'Test';
  const encodedCaesarTestString = 'Uftu';
  const encodedROTTestString = 'Bmab';

  test('is implementEncode Caesar cipher function works properly', () => {
    const mockFn = jest.fn().mockImplementation((str, type) => implementEncode(str, type));

    expect(mockFn(testString, 'caesar')).toEqual(encodedCaesarTestString);
  });

  test('is implementEncode ROT cipher function works properly', () => {
    const mockFn = jest.fn().mockImplementation((str, type) => implementEncode(str, type));

    expect(mockFn(testString, 'rot')).toEqual(encodedROTTestString);
  });

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
