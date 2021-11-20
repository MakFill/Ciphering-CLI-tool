import { findIndex } from '../helpers/index.js';

describe('Function findindex', () => {
  afterEach(() => {
    process.argv.pop();
  });

  test('Is function with the correct index returns an argument', () => {
    process.argv.push('-c');
    const mockFn = jest.fn().mockImplementationOnce(() => findIndex('-c'));
    expect(mockFn()).toBe(process.argv.length - 1);
  });

  test('Is function with the uncorrect index returns false', () => {
    process.argv.push('-d');
    const mockFn = jest.fn().mockImplementationOnce(() => findIndex('-c'));
    expect(mockFn()).toBeFalsy();
  });

  test('Is function with the uncorrect index returns false', () => {
    process.argv.push('-c');
    process.argv.push('-c');
    const mockFn = jest.fn().mockImplementationOnce(() => findIndex('-c'));
    expect(mockFn).toThrowError('Error: Duplicated flag options');
    process.argv.pop();
  });
});
