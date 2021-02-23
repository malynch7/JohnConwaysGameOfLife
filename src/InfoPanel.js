import './InfoPanel.css';

export default function InfoPanel({generation}) {


    return (
        <div id="info-panel" className={'container'}>
            <h4>Rules</h4>
            <ol>
                <li>Any live cell with two or three live neighbours survives.</li>
                <li>Any dead cell with three live neighbours becomes a live cell.</li>
                <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
            </ol>
            <h4>Generation: {generation}</h4>
            <h4>Living Cells:</h4>
        </div>
    );
}