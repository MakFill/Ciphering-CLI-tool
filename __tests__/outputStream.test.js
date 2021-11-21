import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getOutputStream, WriteStream } from '../mainStreams/index.js';

describe('Function getOutputStream', () => {
  let stderr;
  let mockFn;
  const __dirname = path.join(dirname(fileURLToPath(import.meta.url)), '../');

  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    jest.spyOn(process.stderr, 'write').mockImplementation((data) => {
      stderr = data;
    });
    mockFn = jest.fn().mockImplementation(() => {
      return getOutputStream();
    });
  });

  afterEach(() => {
    process.argv.length = 2;
    jest.restoreAllMocks();
  });

  test("Is stderr print custom error while output file doesn't exist", () => {
    process.argv.push('-o', './wrongFile.txt');
    mockFn();
    expect(stderr).toBe('Error: output file does not exist');
  });

  test("Is stderr print custom error while output file doesn't pass and flag -o exists", () => {
    process.argv.push('-o');
    mockFn();
    expect(stderr).toBe('Error: output file does not exist');
  });

  test("Is outputStream === process.stdout while flag -o(or --output) doesn't exists", () => {
    expect(mockFn()).toBe(process.stdout);
  });

  test('Is outputStream === instance of WriteStream while flag -o(or --output) and output file exists/available', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs, 'accessSync').mockImplementation(() => undefined);
    process.argv.push('-o', './testOutput.txt');
    expect(mockFn() instanceof WriteStream).toBeTruthy();
  });

  test("Is stderr print custom error while output file doesn't available for read/write", () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    process.argv.push('-o', './testOutput.txt');
    jest.spyOn(fs, 'accessSync').mockImplementation(() => {
      throw new Error();
    });

    mockFn();

    expect(stderr).toBe('Output file access denied');
  });
});
