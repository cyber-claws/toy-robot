export enum DIRECTIONS {
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST',
  East = 'EAST',
}

export enum COMMANDS {
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Report = 'REPORT',
  Debug = 'DEBUG',
}

export interface ParsedCommand {
  command: COMMANDS;
  options?: Record<string, any>;
}
