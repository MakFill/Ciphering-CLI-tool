import fs from 'fs';
import { getInputStream, ReadStream } from '../mainStreams/index.js';

describe('Function getInputStream', () => {
  let stderr;
  let mockFn;

  beforeEach(() => {
    jest.spyOn(process.stderr, 'write').mockImplementation((data) => {
      stderr = data;
    });
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockFn = jest.fn().mockImplementation(() => getInputStream());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.argv.length = 2;
  });

  test("Is stderr print custom error while input file doesn't exist", () => {
    process.argv.push('-i', './wrongFile.txt');
    mockFn();
    expect(stderr).toBe('Error: input file does not exist');
  });

  test("Is stderr print custom error while input file doesn't pass and flag -i exists", () => {
    process.argv.push('-i');
    mockFn();
    expect(stderr).toBe('Error: input file does not exist');
  });

  test("Is inputStream === process.stdin while flag -i(or --input) doesn't exists", () => {
    expect(mockFn()).toBe(process.stdin);
  });

  test('Is inputStream === instance of ReadStream while flag -i(or --input) exists', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs, 'accessSync').mockImplementation(() => undefined);
    process.argv.push('-i', './testOutput.txt');
    expect(mockFn() instanceof ReadStream).toBeTruthy();
  });

  test("Is stderr print custom error while input file doesn't available for read", () => {
    process.argv.push('-i', './input.txt');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs, 'accessSync').mockImplementation(() => {
      throw Error();
    });

    mockFn();

    expect(stderr).toBe('Input file access denied');
  });
});
