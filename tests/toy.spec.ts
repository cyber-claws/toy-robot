import { Toy } from '../src/toy';
import { COMMANDS, DIRECTIONS } from '../src/types';

describe('Toy', () => {
  let toy: Toy;

  beforeEach(() => {
    toy = new Toy(5);
  });

  describe('place', () => {
    it('should correctly place the toy', () => {
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 3, facing: DIRECTIONS.North });
      expect(toy['x']).toBe(2);
      expect(toy['y']).toBe(3);
      expect(toy['facing']).toBe(DIRECTIONS.North);
    });

    it('should throw error for invalid position', () => {
      expect(() => toy.giveCommand(COMMANDS.Place, { x: 5, y: 5, facing: DIRECTIONS.North })).toThrow('Invalid position');
    });
  });

  describe('move', () => {
    it('should move north', () => {
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 2, facing: DIRECTIONS.North });
      toy.giveCommand(COMMANDS.Move, {});
      expect(toy['y']).toBe(3);
    });

    it('should move south', () => {
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 2, facing: DIRECTIONS.South });
      toy.giveCommand(COMMANDS.Move, {});
      expect(toy['y']).toBe(1);
    });

    it('should move east', () => {
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 2, facing: DIRECTIONS.East });
      toy.giveCommand(COMMANDS.Move, {});
      expect(toy['x']).toBe(3);
    });

    it('should move west', () => {
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 2, facing: DIRECTIONS.West });
      toy.giveCommand(COMMANDS.Move, {});
      expect(toy['x']).toBe(1);
    });

    it('should not move when there are no possible moves', () => {
      toy.giveCommand(COMMANDS.Place, { x: 4, y: 0, facing: DIRECTIONS.South });
      toy.giveCommand(COMMANDS.Move, {});
      toy.giveCommand(COMMANDS.Move, {});
      toy.giveCommand(COMMANDS.Move, {});
      toy.giveCommand(COMMANDS.Move, {});
      expect(toy['x']).toBe(4);
      expect(toy['y']).toBe(0);
      expect(toy['facing']).toBe(DIRECTIONS.South);
    });
  });

  describe('turn', () => {
    it('should turn left from north back to north', () => {
      toy.giveCommand(COMMANDS.Place, { x: 0, y: 0, facing: DIRECTIONS.North });
      toy.giveCommand(COMMANDS.Left, {});
      expect(toy['facing']).toBe(DIRECTIONS.West);
      toy.giveCommand(COMMANDS.Left, {});
      expect(toy['facing']).toBe(DIRECTIONS.South);
      toy.giveCommand(COMMANDS.Left, {});
      expect(toy['facing']).toBe(DIRECTIONS.East);
      toy.giveCommand(COMMANDS.Left, {});
      expect(toy['facing']).toBe(DIRECTIONS.North);
    });

    it('should turn right from north back to north', () => {
      toy.giveCommand(COMMANDS.Place, { x: 0, y: 0, facing: DIRECTIONS.North });
      toy.giveCommand(COMMANDS.Right, {});
      expect(toy['facing']).toBe(DIRECTIONS.East);
      toy.giveCommand(COMMANDS.Right, {});
      expect(toy['facing']).toBe(DIRECTIONS.South);
      toy.giveCommand(COMMANDS.Right, {});
      expect(toy['facing']).toBe(DIRECTIONS.West);
      toy.giveCommand(COMMANDS.Right, {});
      expect(toy['facing']).toBe(DIRECTIONS.North);
    });
  });

  describe('report', () => {
    it('should report position and facing', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      toy.giveCommand(COMMANDS.Place, { x: 1, y: 1, facing: DIRECTIONS.South });
      toy.giveCommand(COMMANDS.Report, {});
      expect(consoleSpy).toHaveBeenCalledWith('1,1,SOUTH');
    });
  });

  describe('debug', () => {
    it('should display the correct grid', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      toy.giveCommand(COMMANDS.Place, { x: 2, y: 2, facing: DIRECTIONS.East });
      toy.giveCommand(COMMANDS.Debug, {});

      const expectedOutput = [
        '\u25A1 \u25A1 \u25A1 \u25A1 \u25A1 ',
        '\u25A1 \u25A1 \u25A1 \u25A1 \u25A1 ',
        '\u25A1 \u25A1 \u25B6 \u25A1 \u25A1 ',
        '\u25A1 \u25A1 \u25A1 \u25A1 \u25A1 ',
        '\u25A1 \u25A1 \u25A1 \u25A1 \u25A1 '
      ];
      expectedOutput.forEach((line, index) => {
        expect(consoleSpy).toHaveBeenNthCalledWith(index + 2, line);
      });
    });
  });
});
