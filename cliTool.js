import { CustomError } from './errorHandler.js';

export const { exit, stdin, stdout, stderr, argv } = process;

export const cli_options = {
  config: ['-c', '--config'],
  input: ['-i', '--input'],
  output: ['-o', '--output'],
};

export function findIndex(option) {
  const index = argv.map((elem, i) => (option.includes(elem) ? i : -1)).filter((ind) => ind !== -1);

  if (index.length === 0) {
    return false;
  }

  if (index.length > 1) {
    throw new CustomError('Error: Duplicated flag options');
  } else {
    return index[0];
  }
}
