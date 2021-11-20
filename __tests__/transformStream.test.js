import { getCipherStreams } from '../mainStreams/index.js';
import { AtbashStream } from '../cipherStreams/index.js';

describe('Function getOutputStream', () => {
  let stderr;
  jest.spyOn(process.stderr, 'write').mockImplementation((data) => {
    stderr = data;
  });
  jest.spyOn(process, 'exit').mockImplementation(() => {});
  const mockFn = jest.fn().mockImplementation(() => getCipherStreams());

  test("Is stderr print custom error while config option flag (-c or --config) doesn't exist", () => {
    mockFn();
    expect(stderr).toBe('Error: Config option is required');
  });

  test("Is stderr print custom error while config option  doesn't exist", () => {
    process.argv.push('-c');
    mockFn();
    expect(stderr).toBe('Error: Config option is required');
    process.argv.pop();
  });

  test('Is getOutputStream return new custom transform stream while passed -c(or --config) flag and correct code string', () => {
    process.argv.push('-c', 'A');
    expect(mockFn()[0]).toBeInstanceOf(AtbashStream);
    process.argv.pop();
    process.argv.pop();
  });

  test('Is getOutputStream return custom Error while passed -c(or --config) flag and uncorrect code string', () => {
    process.argv.push('-c', 'C3');
    expect(mockFn()[0]).toBeFalsy();
    expect(stderr).toBe('Error: wrong config option');
  });
});
