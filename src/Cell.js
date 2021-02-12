import './Cell.css';

export default function Cell({data, gridDimensions, updateGrid}) {

    const handleClick = () => {
        updateGrid(data.id, !data.isAlive);
    }

    const style = (gridDimensions.columns < 11) ? {} : {
        width: `${100 / gridDimensions.columns}%`
    }

    return (
        <div style={style}
            className = {`cell ${data.isAlive ? 'alive' : ''}`}
            onClick = {handleClick}
        />
    );
}