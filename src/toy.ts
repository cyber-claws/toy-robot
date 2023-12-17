import {COMMANDS, DIRECTIONS} from './types';

export class Toy {
  private x?: number = undefined;
  private y?: number = undefined;
  private facing?: DIRECTIONS = undefined;
  constructor(private dimension: number) {}

  giveCommand(command: COMMANDS, options: Record<string, any>) {
    switch (command) {
      case COMMANDS.Place:
        this.place(options.x, options.y, options.facing);
        break;
      case COMMANDS.Left:
      case COMMANDS.Right:
        this.turn(command);
        break;
      case COMMANDS.Move:
        this.move();
        break;
      case COMMANDS.Report:
        this.report();
        break;
      case COMMANDS.Debug:
        this.debug();
        break;
      default:
        console.error('Invalid command ignored');
        break;
    }
  }

  private place(x: number, y: number, facing: DIRECTIONS) {
    if (x < 0 || x >= this.dimension || y < 0 || y >= this.dimension) {
      throw new Error('Invalid position');
    }
    this.x = x;
    this.y = y;
    this.facing = facing;
  }

  private move() {
    if (!this.isToyPlaced)
      return console.error('Cannot move, Toy not yet placed');

    switch (this.facing) {
      case DIRECTIONS.North:
        if (this.y! < this.dimension - 1) {
          this.y!++;
        }
        break;
      case DIRECTIONS.South:
        if (this.y! > 0) {
          this.y!--;
        }
        break;
      case DIRECTIONS.West:
        if (this.x! > 0) {
          this.x!--;
        }
        break;
      case DIRECTIONS.East:
        if (this.x! < this.dimension - 1) {
          this.x!++;
        }
        break;
    }
  }
  private turn(direction: COMMANDS.Left | COMMANDS.Right) {
    if (!this.isToyPlaced)
      return console.error('Cannot turn, Toy not yet placed');

    switch (this.facing) {
      case DIRECTIONS.North:
        this.facing =
          direction === COMMANDS.Left ? DIRECTIONS.West : DIRECTIONS.East;
        break;
      case DIRECTIONS.South:
        this.facing =
          direction === COMMANDS.Left ? DIRECTIONS.East : DIRECTIONS.West;
        break;
      case DIRECTIONS.West:
        this.facing =
          direction === COMMANDS.Left ? DIRECTIONS.South : DIRECTIONS.North;
        break;
      case DIRECTIONS.East:
        this.facing =
          direction === COMMANDS.Left ? DIRECTIONS.North : DIRECTIONS.South;
        break;
    }
  }
  private report() {
    if (!this.isToyPlaced)
      return console.error('Cannot report, Toy not yet placed');
    console.log(`${this.x},${this.y},${this.facing}`);
  }

  private debug() {
    if (!this.isToyPlaced)
      return console.error('Cannot debug, Toy not yet placed');
    const emptyBlock = '\u25A1 ';
    let toySymbol = '';
    switch (this.facing) {
      case DIRECTIONS.North:
        toySymbol = '\u25B2 ';
        break;
      case DIRECTIONS.South:
        toySymbol = '\u25BC ';
        break;
      case DIRECTIONS.East:
        toySymbol = '\u25B6 ';
        break;
      case DIRECTIONS.West:
        toySymbol = '\u25C0 ';
        break;
    }

    for (let i = this.dimension - 1; i >= 0; i--) {
      let row = '';
      for (let j = 0; j < this.dimension; j++) {
        if (i === this.y && j === this.x) {
          row += toySymbol;
        } else {
          row += emptyBlock;
        }
      }
      console.log(row);
    }
  }

  private get isToyPlaced(): boolean {
    return (
      this.x !== undefined && this.y !== undefined && this.facing !== undefined
    );
  }
}
