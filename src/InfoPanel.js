import './InfoPanel.css';

export default function Cell({generation}) {


    return (
        <div id="info-panel">
            <h5>Rules</h5>
            <ol>
                <li>Any live cell with two or three live neighbours survives.</li>
                <li>Any dead cell with three live neighbours becomes a live cell.</li>
                <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
            </ol>
            <h5>Generation: {generation}</h5>
            <h5>Living Cells:</h5>
        </div>
    );
}