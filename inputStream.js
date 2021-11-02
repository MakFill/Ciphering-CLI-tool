import { existsSync, createReadStream } from 'fs';
import { findIndex, cli_options } from './cliTool.js';

const { stdin, exit, stderr, argv } = process;

let input_stream;
const inputFlagIndex = findIndex(cli_options.input);
console.log(inputFlagIndex)
if (inputFlagIndex) {
  const inputFileIndex = inputFlagIndex + 1;
  const existFile = existsSync(argv[inputFileIndex]);
    if (existFile) {
      input_stream = createReadStream(argv[inputFileIndex], 'utf8');
    } else {
      stderr.write(`Error: file ${argv[inputFileIndex]} does not exist`);
      exit(1);
    }
} else {
  input_stream = stdin
}

export default input_stream;