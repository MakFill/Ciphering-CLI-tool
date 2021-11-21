import { errorHandler, CustomError } from '../helpers/index.js';

describe('Function errorHandler', () => {
  test('Is stderr print custom error', () => {
    let stderr;
    jest.spyOn(process.stderr, 'write').mockImplementationOnce((data) => {
      stderr = data;
    });
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {});
    const mockFn = jest
      .fn()
      .mockImplementationOnce(() => errorHandler(new CustomError('Some error')));
    mockFn();
    expect(stderr).toBe('Some error');
  });

  test('Is throw err (if err !instanceof CustomError)', () => {
    const mockFn = jest.fn().mockImplementationOnce(() => errorHandler(new Error('Some error')));

    expect(mockFn).toThrowError('Some error');
  });
});
