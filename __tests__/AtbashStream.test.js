import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { AtbashStream, implementAtbash } from '../cipherStreams/index.js';

describe('Atbash stream', () => {
  const testString = 'Test';
  const encodedTestString = 'Gvhg';

  test('is implementAtbash function works properly', () => {
    const mockFn = jest.fn().mockImplementation((str) => implementAtbash(str));

    expect(mockFn(testString)).toEqual(encodedTestString);
  });

  test('Is Atbash instance workes properly', () => {
    const transform = new AtbashStream({ objectMode: true });
    const reader = new ObjectReadableMock(testString);
    const writer = new ObjectWritableMock();

    reader.pipe(transform).pipe(writer);
    writer.on('finish', () => {
      expect(writer.data.join('')).toBe(encodedTestString);
    });
  });
});
