import * as fs from 'node:fs';
import * as readline from 'node:readline';

import {Toy} from './toy';
import {COMMANDS, ParsedCommand} from './types';

export const startInteractiveMode = (size: number): void => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const toy = new Toy(size);
  const runCommands = () => {
    rl.question(
      'Enter COMMAND to give to the toy(type "EXIT" to quit): ',
      command => {
        if (command.toUpperCase() === 'EXIT') {
          console.log('Shutting down toy simulation!');
          rl.close();
        } else {
          const parsedCommand = parseCommand(command);
          if (parsedCommand?.command) {
            toy.giveCommand(parsedCommand.command, parsedCommand.options || {});
          }
          runCommands();
        }
      }
    );
  };
  runCommands();
};

export const startFileMode = (commandFile: string, size: number): void => {
  const fileStream = fs.createReadStream(commandFile);
  fileStream.on('error', error => {
    return console.error(`Error reading command file: ${error.message}`);
  });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const toy = new Toy(size);

  rl.on('line', command => {
    const parsedCommand = parseCommand(command);
    if (parsedCommand?.command) {
      console.info(`Running command: ${command}`);
      toy.giveCommand(parsedCommand.command, parsedCommand.options || {});
    }
  });

  rl.on('close', () => {
    return console.log(
      'Finished running examples from file, shutting down toy simulation!'
    );
  });
};

export const parseCommand = (userInput: string): ParsedCommand | null => {
  const parts = userInput.trim().split(/\s+/);
  const command = parts[0].toUpperCase();
  switch (command) {
    case COMMANDS.Place: {
      if (parts.length !== 2) {
        console.error(
          'Invalid PLACE command format, Should be in the format: PLACE X,Y,{SOUTH/NORTH/EAST/WEST}'
        );
        return null;
      }
      const placeArgs = parts[1].split(',');
      if (placeArgs.length !== 3) {
        console.error('Invalid PLACE command arguments');
        return null;
      }
      const [x, y, facing] = placeArgs;
      if (isNaN(parseInt(x)) || isNaN(parseInt(y))) {
        console.error('Invalid coordinates for PLACE command');
        return null;
      }
      return {
        command: COMMANDS.Place,
        options: {x: parseInt(x), y: parseInt(y), facing: facing.toUpperCase()},
      };
    }
    case COMMANDS.Move:
      return {command: COMMANDS.Move};
    case COMMANDS.Left:
      return {command: COMMANDS.Left};
    case COMMANDS.Right:
      return {command: COMMANDS.Right};
    case COMMANDS.Report:
      return {command: COMMANDS.Report};
    case COMMANDS.Debug:
      return {command: COMMANDS.Debug};
    default:
      console.error('Invalid command');
      return null;
  }
};
