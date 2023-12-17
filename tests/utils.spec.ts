import { COMMANDS } from '../src/types';
import { parseCommand } from '../src/utils';

describe('parseCommand', () => {
  it('should parse PLACE command correctly', () => {
    const result = parseCommand('PLACE 1,2,NORTH');
    expect(result).toEqual({
      command: COMMANDS.Place,
      options: { x: 1, y: 2, facing: 'NORTH' },
    });
  });

  it('should return null for invalid PLACE command', () => {
    const result = parseCommand('PLACE 1,NORTH');
    expect(result).toBeNull();
  });

  it('should parse MOVE command correctly', () => {
    const result = parseCommand('MOVE');
    expect(result).toEqual({ command: COMMANDS.Move });
  });

  it('should parse LEFT command correctly', () => {
    const result = parseCommand('LEFT');
    expect(result).toEqual({ command: COMMANDS.Left });
  });

  it('should parse RIGHT command correctly', () => {
    const result = parseCommand('RIGHT');
    expect(result).toEqual({ command: COMMANDS.Right });
  });

  it('should parse REPORT command correctly', () => {
    const result = parseCommand('REPORT');
    expect(result).toEqual({ command: COMMANDS.Report });
  });

  it('should return null for invalid command', () => {
    const result = parseCommand('JUMP');
    expect(result).toBeNull();
  });
});
