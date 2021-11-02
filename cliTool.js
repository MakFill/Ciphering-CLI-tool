export const { exit, stderr, argv } = process;
const allowedFlags = ['-c', '--config', '-i', '--input', '-o', '--output'];

function checkFlag(flag) {
  if (!allowedFlags.includes(flag)) {
    stderr.write('Wrong flag');
    exit(1);
  }
  const flagIndex = argv.indexOf(flag);

  return flagIndex !== -1 ? argv[flagIndex + 1] : null;
}

export const cli_options = {
  config: ['-c', '--config'],
  input: ['-i', '--input'],
  output: ['-o', '--output']
}

export function findIndex(option) {
  const index = argv
  .map((elem, i) => option.includes(elem) ? i : -1)
  .filter(ind => ind !== -1);

  if(index.length === 0) {
    return false
  }

  if (index.length > 1) {
    stderr.write('Duplicated flag options');
    exit(1);
  } else {
    return index[0]; 
  }
}

