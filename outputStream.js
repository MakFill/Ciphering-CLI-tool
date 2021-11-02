import { existsSync, createWriteStream } from 'fs';
import { findIndex, cli_options } from './cliTool.js';

const { stdout, exit, stderr, argv } = process;

let output_stream;
const outputFlagIndex = findIndex(cli_options.output);
if (outputFlagIndex) {
  const outputFileIndex = outputFlagIndex + 1;
    const existFile = existsSync(argv[outputFileIndex]);
    if (existFile) {
      output_stream = createWriteStream(argv[outputFileIndex], { flags: 'a+' });
    } else {
      stderr.write(`Error: file ${argv[outputFileIndex]} does not exist`);
      exit(1);
    }
} else {
  output_stream = stdout
  // exit();
}

export default output_stream;