import React, {useState, useRef, useEffect} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';

export default function ControlPanel({grid, setGrid, generation, setGeneration, rowCount, setRowCount, columnCount,
                                         setColumnCount, freshGrid}) {

    const interval = useRef(null);
    const [isRunning, setRunning] = useState(false);
    const [tickPeriod, setTickPeriod] = useState(200);
    const [genZeroGrid, setGenZeroGrid] = useState(null);

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

    const play = () => {
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

    const changeSpeed = (sliderValue) => {
        setTickPeriod(1000 / sliderValue);
    }


    useEffect( () => {
        if (isRunning) {
            interval.current = setInterval(incrementGeneration, tickPeriod);
        }
        return () => clearInterval(interval.current);
    }, [grid, incrementGeneration, isRunning, tickPeriod])


    return (
        <div id='control-panel' className='container'>
            <h3 className={'section-header'}>Controls</h3>
            <div className={'buttons'}>
                <div className='button-row'>
                    <button onClick={step}>Step</button>
                    <button onClick={isRunning ? pause : play}>{isRunning ? 'Pause' : 'Play'}</button>
                    <button onClick={resetGrid}>Reset</button>
                    <button onClick={clearGrid}>Clear</button>
                </div>
                <div className="speed-slider-wrapper">
                    <label htmlFor="speed-slider">Speed:</label>
                    <Slider
                           id="speed-slider"
                           min={1}
                           max={20}
                           defaultValue={5}
                           onChange={changeSpeed}
                    />
                </div>
                <div className={'grid-select-wrapper'}>
                    <label htmlFor='grid-size-select'>Grid Size:</label>
                    <select value={rowCount.toString()}
                            id='grid-size-select'
                            onChange={changeGridDimensions}>
                        <option value='10'>10 x 10</option>
                        <option value='25' >25 x 25</option>
                        <option value='50'>50 x 50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}