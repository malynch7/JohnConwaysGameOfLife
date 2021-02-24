import './ControlPanel.css';
import React from "react";

export default function ControlPanel({rowCount, isRunning, step, play, pause, changeGridDimensions,
                                         resetGrid, clearGrid}) {


    return (
        <div id='control-panel' className='container'>
            <h3 className={'section-header'}>Controls</h3>
            <div className='button-row'>
                <button onClick={step}>Step</button>
                <button onClick={isRunning ? pause : play}>{isRunning ? 'Pause' : 'Play'}</button>
                <button onClick={resetGrid}>Reset</button>
                <button onClick={clearGrid}>Clear</button>
            </div>
            <label htmlFor='grid-size-select'>Grid Size:</label>
            <select value={rowCount.toString()}
                    id='grid-size-select'
                    onChange={changeGridDimensions}>
                <option value='10'>10 x 10</option>
                <option value='25' >25 x 25</option>
                <option value='50'>50 x 50</option>
                <option value='100'>100 x 100</option>
            </select>
        </div>
    );
}