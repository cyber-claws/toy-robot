import {Command, Option} from 'commander';

import {startFileMode, startInteractiveMode} from './utils';

const cli = new Command();

cli
  .name('toy-sim')
  .description(
    'Application for simulating a Toy robot moving on a square tabletop'
  )
  .version('1.0.0');

cli
  .addOption(new Option('-f, --file <path>', 'File with list of examples'))
  .addOption(
    new Option('-s, --size <number>', 'Tabletop dimension').default(5, '5x5')
  )
  .action(options => {
    if (!options?.file) {
      startInteractiveMode(options?.size);
      return;
    }
    startFileMode(options?.file, options?.size);
  });
cli.parse();
