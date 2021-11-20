import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { DecodeStream, implementDecode } from '../cipherStreams/index.js';

describe('Decode streams', () => {
  const testString = 'TestA';
  const decodeCaesarTestString = 'SdrsZ';
  const decodeROTTestString = 'LwklS';

  test('is implementDecode Caesar cipher function works properly', () => {
    const mockFn = jest.fn().mockImplementation((str, type) => implementDecode(str, type));

    expect(mockFn(testString, 'caesar')).toEqual(decodeCaesarTestString);
  });

  test('is implementDecode ROT cipher function works properly', () => {
    const mockFn = jest.fn().mockImplementation((str, type) => implementDecode(str, type));

    expect(mockFn(testString, 'rot')).toEqual(decodeROTTestString);
  });

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
