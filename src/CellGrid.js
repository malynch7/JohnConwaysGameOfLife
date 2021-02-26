import React, {useState} from 'react';

import Cell from './Cell'
import './CellGrid.css';

export default function CellGrid({grid, setGrid, rowCount, pattern, patterns}) {

    const [hoverIds, setHoverIds] = useState([]);

    const showHoverPattern = (id) => {

        const origin = [Math.floor(id / rowCount), id % rowCount];
        let ids = [];

        if (grid[origin[0]][origin[1]].isAlive) return;

        if (pattern === 'Row'){
            grid[origin[0]].forEach( cell => {
                ids.push(cell.id);
            });
        }

        else if (pattern === 'Column'){
            grid.forEach( cellRow => {
                ids.push(cellRow[origin[1]].id);
            })
        }

        patterns[pattern].forEach( (target) => {
            try {
                ids.push(grid[origin[0] + target[0]][origin[1] + target[1]].id);
            }
            catch {}
        });

        setHoverIds(ids);
    }

    const removeHoverPattern = () => {

        setHoverIds([]);
    }

    const applyPatternToGrid = (id) => {
        const nextGrid = [...grid];
        const origin = [Math.floor(id / rowCount), id % rowCount];

        if (nextGrid[origin[0]][origin[1]].isAlive === true) {
            nextGrid[origin[0]][origin[1]].isAlive = false;
        }
        else {
            if (pattern === 'Row'){
                nextGrid[origin[0]].forEach( (cell) => {
                    cell.isAlive = true;
                });
            }
            else if (pattern === 'Column'){
                nextGrid.forEach( cellRow => {
                    cellRow[origin[1]].isAlive = true;
                })
            }

            const coordinates = patterns[pattern];

            coordinates.forEach( (target) => {
                try {
                    nextGrid[origin[0] + target[0]][origin[1] + target[1]].isAlive = true;
                }
                catch {}
            });
        }
        setGrid(nextGrid);
    }

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
                            hover={hoverIds.includes(cell.id)}
                            key={cell.id}
                            data={cell}
                            applyPatternToGrid={applyPatternToGrid}
                            showHoverPattern={showHoverPattern}
                            removeHoverPattern={removeHoverPattern}
                        />
                    })
                }</div>
        );
    });
}