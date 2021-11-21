import { getCipherStreams } from '../mainStreams/index.js';
import { AtbashStream, EncodeStream, DecodeStream } from '../cipherStreams/index.js';

describe('Function getOutputStream', () => {
  let stderr;
  let mockFn;

  beforeEach(() => {
    jest.spyOn(process.stderr, 'write').mockImplementation((data) => {
      stderr = data;
    });
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockFn = jest.fn().mockImplementation(() => getCipherStreams());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.argv.length = 2;
  });

  test("Is stderr print custom error while config option flag (-c or --config) doesn't exist", () => {
    mockFn();
    expect(stderr).toBe('Error: Config option is required');
  });

  test("Is stderr print custom error while config option  doesn't exist", () => {
    process.argv.push('-c');
    mockFn();
    expect(stderr).toBe('Error: Config option is required');
  });

  describe('Is getOutputStream return new custom transform stream while passed -c(or --config) flag and correct code string', () => {
    beforeEach(() => {
      mockFn = jest.fn().mockImplementation(() => getCipherStreams());
    });

    afterEach(() => {
      jest.restoreAllMocks();
      process.argv.length = 2;
    });

    test('Code A', () => {
      process.argv.push('-c', 'A');
      expect(mockFn()[0]).toBeInstanceOf(AtbashStream);
    });
    test('Code C1', () => {
      process.argv.push('-c', 'C1');
      expect(mockFn()[0]).toBeInstanceOf(EncodeStream);
    });

    test('Code R1', () => {
      process.argv.push('-c', 'R1');
      expect(mockFn()[0]).toBeInstanceOf(EncodeStream);
    });

    test('Code C0', () => {
      process.argv.push('-c', 'C0');
      expect(mockFn()[0]).toBeInstanceOf(DecodeStream);
    });

    test('Code R0', () => {
      process.argv.push('-c', 'R0');
      expect(mockFn()[0]).toBeInstanceOf(DecodeStream);
    });
  });

  test('Is getOutputStream return custom Error while passed -c(or --config) flag and uncorrect code string', () => {
    process.argv.push('-c', 'C3');
    expect(mockFn()[0]).toBeFalsy();
    expect(stderr).toBe('Error: wrong config option');
  });
});
