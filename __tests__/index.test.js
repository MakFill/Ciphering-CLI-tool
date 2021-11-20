import { pipeline } from 'stream';
import { ObjectReadableMock, ObjectWritableMock } from 'stream-mock';
import { getCipherStreams } from '../mainStreams/index.js';

describe('Is success while take cipher usage scenarios', () => {
  let readerMock;
  let writerMock;
  let transformMock;
  const testString = 'This is secret. Message about "_" symbol!';
  beforeEach(() => {
    readerMock = new ObjectReadableMock(testString);
    writerMock = new ObjectWritableMock();
    transformMock = jest.fn().mockImplementationOnce(() => getCipherStreams());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.argv.length = 2;
  });

  test('C1-C1-R0-A', (done) => {
    process.argv.push('-c', 'C1-C1-R0-A');
    const decodedTestString = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';
    pipeline(readerMock, ...transformMock(), writerMock, (err) => {
      expect(writerMock.data.join('')).toBe(decodedTestString);
      done();
    });
  });

  test('C1-C0-A-R1-R0-A-R0-R0-C1-A', (done) => {
    process.argv.push('-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A');
    const decodedTestString = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!';
    pipeline(readerMock, ...transformMock(), writerMock, (err) => {
      expect(writerMock.data.join('')).toBe(decodedTestString);
      done();
    });
  });

  test('A-A-A-R1-R0-R0-R0-C1-C1-A', (done) => {
    process.argv.push('-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A');
    const decodedTestString = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!';
    pipeline(readerMock, ...transformMock(), writerMock, (err) => {
      expect(writerMock.data.join('')).toBe(decodedTestString);
      done();
    });
  });

  test('C1-R1-C0-C0-A-R0-R1-R1-A-C1', (done) => {
    process.argv.push('-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1');
    const decodedTestString = 'This is secret. Message about "_" symbol!';
    pipeline(readerMock, ...transformMock(), writerMock, (err) => {
      expect(writerMock.data.join('')).toBe(decodedTestString);
      done();
    });
  });
});
