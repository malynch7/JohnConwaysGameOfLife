import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import CellGrid from "./CellGrid";
import InfoPanel from "./InfoPanel"
import ControlPanel from "./ControlPanel";



function App() {
    const interval = useRef(null);
    const [rowCount, setRowCount] = useState(25)
    const [columnCount, setColumnCount] = useState(25)
    const [generation, setGeneration] = useState(0)
    const [isRunning, setRunning] = useState(false);
    const [grid, setGrid] = useState(null);
    const [genZeroGrid, setGenZeroGrid] = useState(null)

    const changeGridDimensions = (e) => {
        setRowCount(parseInt(e.target.value));
        setColumnCount(parseInt(e.target.value));
        setGrid(freshGrid(parseInt(e.target.value), parseInt(e.target.value)));
        setGeneration(0);
        setGenZeroGrid(null);
    }

    const resetGrid = () => {
        if (genZeroGrid !== null) setGrid(genZeroGrid);
        setGeneration(0);
        if (isRunning) setRunning(false);
    }

    const clearGrid = () => {
        setGrid(freshGrid(rowCount, columnCount));
        setGeneration(0);
        if (isRunning) setRunning(false);
    }

    const freshGrid = (rows, columns) => {
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

    const updateCell = (id, isAlive) => {
        const newGrid = [...grid];
        newGrid[Math.floor(id / rowCount)][id % rowCount].isAlive = isAlive;
        setGrid(newGrid);
    }

    const incrementGeneration = () => {
        const newGrid = grid.map((cellRow, i) => {
            return cellRow.map((cell, j) => {
                let neighbors = 0;
                const newCell = {
                    id: cell.id,
                    isAlive: cell.isAlive
                };

                //check above
                if (i !== 0) {
                    if (j !== 0 && grid[i-1][j-1].isAlive) neighbors++;
                    if (grid[i-1][j].isAlive) neighbors++;
                    if (j !== (columnCount - 1) && grid[i-1][j+1].isAlive) neighbors++;
                }

                //check beside
                if (j !== 0 && grid[i][j-1].isAlive) neighbors++;
                if (j !== (columnCount - 1) && grid[i][j+1].isAlive) neighbors++;

                //check below
                if (i !== rowCount - 1) {
                    if (j !== 0 && grid[i+1][j-1].isAlive) neighbors++;
                    if (grid[i+1][j].isAlive) neighbors++;
                    if (j !== (rowCount - 1) && grid[i+1][j+1].isAlive) neighbors++;
                }

                if (cell.isAlive && neighbors !== 2 && neighbors !== 3)  {
                    newCell.isAlive = false;
                } else if (!cell.isAlive && neighbors === 3) {
                    newCell.isAlive = true;
                }
                return newCell;
            })
        })
        setGrid(newGrid);
        setGeneration((prevGeneration) => prevGeneration + 1);
    }

    useEffect( () => {
        if (isRunning) {
            interval.current = setInterval(incrementGeneration, 200);
        }
        return () => clearInterval(interval.current);
    }, [grid, isRunning])

    const play = (speed = 1) => {
        if (generation === 0) setGenZeroGrid(grid);
        setRunning(true);
    }
    const pause = () => {
        setRunning(false);
    }
    const step = () => {
        if (generation === 0) setGenZeroGrid(grid);
        incrementGeneration();
    }

    if (grid === null) setGrid(freshGrid(rowCount, columnCount));

    return (
        <div className='main' style={{height: window.innerHeight}}>
            <div className={'container grid-container'}>
                <h1 className='site-header'>React Life</h1>
                <CellGrid
                    updateCell={updateCell}
                    grid={grid}
                />
            </div>

            <ControlPanel
                rowCount={rowCount}
                isRunning={isRunning}
                step={step}
                play={play}
                pause={pause}
                changeGridDimensions={changeGridDimensions}
                resetGrid={resetGrid}
                clearGrid={clearGrid}
            />
            <InfoPanel
                generation={generation}
            />
        </div>

    );
}

export default App;
