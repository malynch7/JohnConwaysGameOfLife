import './App.css';
import React, {useState} from 'react';
import CellGrid from "./CellGrid";
import InfoPanel from "./InfoPanel"
import ControlPanel from "./ControlPanel";



function App() {
    const [generation, setGeneration] = useState(0);
    const [grid, setGrid] = useState(null);
    const [genZeroGrid, setGenZeroGrid] = useState(null);
    const [rowCount, setRowCount] = useState(25);
    const [columnCount, setColumnCount] = useState(25);

    const updateCell = (id, isAlive) => {
        const newGrid = [...grid];
        newGrid[Math.floor(id / rowCount)][id % rowCount].isAlive = isAlive;
        setGrid(newGrid);
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

    if (grid === null) setGrid(freshGrid(rowCount, columnCount));

    return (
        <div className='main' style={(window.innerWidth > 960) ? {height: window.innerHeight} : {}}>
            <div className={'container grid-container'}>
                <h1 className='site-header'>React Life</h1>
                <CellGrid
                    updateCell={updateCell}
                    grid={grid}
                />
            </div>
            <ControlPanel
                grid={grid}
                setGrid={setGrid}
                generation={generation}
                setGeneration={setGeneration}
                genZeroGrid={genZeroGrid}
                setGenZeroGrid={setGenZeroGrid}
                rowCount={rowCount}
                setRowCount={setRowCount}
                columnCount={columnCount}
                setColumnCount={setColumnCount}
                freshGrid={freshGrid}
            />
            <InfoPanel
                generation={generation}
            />
        </div>
    );
}

export default App;
