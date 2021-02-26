import './Cell.css';

export default function Cell({data, gridDimensions, applyPatternToGrid, hover, showHoverPattern, removeHoverPattern}) {

    const style = (gridDimensions.columns < 11) ? {} : {
        width: `${100 / gridDimensions.columns}%`
    }

    return (
        <div style={style}
            className={`cell${data.isAlive ? ' alive' : ''} ${hover ? ' hover-pattern' : ''}`}
            onClick={() => applyPatternToGrid(data.id)}
             onMouseEnter={() => showHoverPattern(data.id)}
             onMouseLeave={removeHoverPattern}
        />
    );
}