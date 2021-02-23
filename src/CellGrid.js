import React, {useState} from 'react';

import Cell from './Cell'
import './CellGrid.css';

export default function CellGrid({grid, updateCell}) {

    return grid.map((cellRow) => {
        return (
            <div key={`row${Math.floor(cellRow[0].id)}`} className="cell-row">
                {
                    cellRow.map((cell) => {
                        return <Cell
                            gridDimensions={{
                                rows: grid.length,
                                columns: grid[0].length
                            }}
                            className='cell'
                            key={cell.id}
                            data={cell}
                            updateGrid={updateCell}
                        />
                    })
                }</div>
        );
    });
}