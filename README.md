Toy Robot Simulator
---

### Description

Toy Robot Simulator is a command-line application written in TypeScript. It simulates a toy robot moving on a square tabletop, of dimensions n units x n units. The robot can receive commands such as MOVE, LEFT, RIGHT, REPORT, DEBUG and PLACE.
[Watch the Demo Video](./demo.mp4)


### Pre-requisites

- Node.js >= 18.0.0
- yarn >= 1.22.0

### Installation

Clone the repository:

```bash
$> git clone https://github.com/cyber-claws/toy-robot.git
$> cd toy-robot
```

Install the dependencies, build and link the application:

```bash
$> yarn install
$> yarn build
$> chmod +x bin/toy-sim
$> yarn link "toy-sim"
```

### Usage

There are 2 ways to run the application, as an interactive shell or by passing a file containing commands.

#### Interactive Shell

```bash
$> bin/toy-sim --size=5 # size will default to 5 if not provided
```
You can issue commands to the robot in the following format:
  ```bash
$> PLACE X,Y,F # Place the robot on the table in position X,Y and facing NORTH, SOUTH, EAST, or WEST.
$> MOVE # Move the robot one unit forward in the direction it is currently facing.
$> LEFT or RIGHT # Rotate the robot 90 degrees in the specified direction without changing the position of the robot.
$> REPORT # Announce the X,Y and F of the robot.
$> DEBUG # Print the current state of the robot system.
```

#### File Input

```bash
$> bin/toy-sim --file path/to/command/file.txt --size=5 # size will default to 5 if not provided
```
examples of the command file can be found in the [examples](./examples) folder

### Testing

The application comes with a suite of tests to ensure functionality. To run these tests, execute:

```bash
$> yarn test
```

### Contributing
This is a presentation project, and contributions will not be accepted at this time.

### License
This project is licensed under the MIT License - see the LICENSE file for details
