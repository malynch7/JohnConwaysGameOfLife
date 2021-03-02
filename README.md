# John Conway's Game of Life

John Conway's famous Game of Life recreated in modern reactJS. Choose from pre-made patterns or create your own with our variable grid!

## Rules
The player is presented with a grid of cells. Each cell exists in one of two states, alive or dead. With every step of the grid, the following rules are applied to each cell:

1. Any live cell with two or three live neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Controls

#### `Step`
On Step, the current generation will be incremented by one.

#### `Play / Pause`
On Play, the grid will continuous apply steps until paused.

#### `Reset`
On Reset, the grid will be returned it's prior state at generation 0.

#### `Clear`
On Clear, all cells in the grid will be set to dead.

#### `Speed`
The speed slider controls the interval between steps when `Play` is active, scaling from 1 second to 50 milliseconds (may be limited by cpu performance).

#### `Pattern`
The selected pattern will be inserted into the grid, centered around the origin cell, when clicked.

#### `Grid Size`
The cell grid will reflect the dimensions specified. If changed, the grid will also be cleared.

## Development Tools

- Javascript / HTML / CSS
- ReactJS
- IntelliJ IDEA
- Webpack
- Babel
- Github (Git Bash)


## See More...

[Mark Lynch's Portfolio](https://malynch7.github.io).
