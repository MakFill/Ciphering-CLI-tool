import {
  selectCipherStream,
  EncodeStream,
  DecodeStream,
  AtbashStream,
} from '../cipherStreams/index.js';

describe('selectCipherStream function', () => {
  test('Is Atbash(A) case works properly', () => {
    expect(selectCipherStream('A')).toBeInstanceOf(AtbashStream);
  });

  test('Is Caesar encode(C1) case works properly', () => {
    const instance = selectCipherStream('C1');
    expect(instance).toBeInstanceOf(EncodeStream);
    const { type } = instance;
    expect(type).toBe('caesar');
  });

  test('Is ROT encode(R1) case works properly', () => {
    const instance = selectCipherStream('R1');
    expect(instance).toBeInstanceOf(EncodeStream);
    const { type } = instance;
    expect(type).toBe('rot');
  });

  test('Is Caesar decode(C0) case works properly', () => {
    const instance = selectCipherStream('C0');
    expect(instance).toBeInstanceOf(DecodeStream);
    const { type } = instance;
    expect(type).toBe('caesar');
  });

  test('Is ROT decode(R0) case works properly', () => {
    const instance = selectCipherStream('R0');
    expect(instance).toBeInstanceOf(DecodeStream);
    const { type } = instance;
    expect(type).toBe('rot');
  });

  test('Is user passes incorrect symbols in argument for --config', () => {
    const mockFn = jest.fn().mockImplementationOnce(() => selectCipherStream('R3'));
    expect(mockFn).toThrowError('Error: wrong config option');
  });
});
