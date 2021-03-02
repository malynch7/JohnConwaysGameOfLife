import './App.css';
import React, {useState} from 'react';
import CellGrid from "./CellGrid";
import InfoPanel from "./InfoPanel"
import ControlPanel from "./ControlPanel";


function App() {

    const [generation, setGeneration] = useState(0);
    const [grid, setGrid] = useState(null);
    const [rowCount, setRowCount] = useState(25);
    const [columnCount, setColumnCount] = useState(25);
    const [pattern, setPattern] = useState('Cell');

    const patterns = {
        // Each pattern contains a set of coordinates to be toggled, represented as [row, column]
        // positional shifts from the origin.

        'Cell': [[0,0]],
        'Blinker': [[-1,0], [0,0], [1,0]],
        'Glider': [[-1,0], [0,0], [0,1], [1,-1], [1,1]],
        'Spaceship': [[-2,0], [-2,1], [-1,-2], [-1,-1], [-1,1], [-1,2], [0,-2], [0,-1], [0,0], [0,1], [1,0], [1,-1]],
        'R-Pentamino': [[-1,0], [-1,1], [0,-1], [0,0], [1,0]],
        'Acorn': [[-1,-2], [0,0], [1,-3], [1,-2], [1,1], [1,2],[1,3]],
        'Row' : [],
        'Column' : [],
    };


    const countLivingCells = (cellGrid) => {
        let count = 0;
        if(grid === null) return 0;

        cellGrid.forEach( (cellRow) => {
            count += cellRow.filter( (cell) => cell.isAlive).length;
            }
        )
        return count;
    }

    const createFreshGrid = (rows, columns) => {
        let nextId = 0;
        const freshGrid = [];
        for (let i = 0; i < rows; i++){
            freshGrid.push([]);
            for (let j = 0; j < columns; j++){
                freshGrid[i].push({
                    id: nextId,
                    isAlive: false,
                })
                nextId++;
            }
        }
        return freshGrid;
    }

    const createStartingGrid = (freshGrid) => {
        // assume 25 x 25
        freshGrid[18][7].isAlive = true;
        freshGrid[18][9].isAlive = true;
        freshGrid[17][8].isAlive = true;
        freshGrid[17][9].isAlive = true;
        freshGrid[16][8].isAlive = true;

        return freshGrid;
    }

    if (grid === null) {
        let freshGrid = createFreshGrid(rowCount, columnCount);
        const startingGrid = createStartingGrid(freshGrid);
        setGrid(startingGrid);
    }

    return (
        <div className='main' style={(window.innerWidth > 1250) ? {height: window.innerHeight} : {}}>
            <div className={'container grid-container'}>
                <h1 className='site-header'>John Conway's Game of Life</h1>
                <h4>Generation: {generation}</h4>
                <CellGrid
                    grid={grid}
                    setGrid={setGrid}
                    rowCount={rowCount}
                    patterns={patterns}
                    pattern={pattern}
                />
            </div>
            <ControlPanel
                grid={grid}
                setGrid={setGrid}
                generation={generation}
                setGeneration={setGeneration}
                rowCount={rowCount}
                setRowCount={setRowCount}
                columnCount={columnCount}
                setColumnCount={setColumnCount}
                freshGrid={createFreshGrid}
                patterns={patterns}
                pattern={pattern}
                setPattern={setPattern}
            />
            <InfoPanel
                generation={generation}
                totalCells={rowCount * columnCount}
                livingCellCount={countLivingCells(grid)}
            />
        </div>
    );
}

export default App;
