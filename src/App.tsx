import ScatterPlot from "./component/scatterPlot";
import { wineDataset } from "./Wine-Data";
import BarChart from './component/barChart';

function App() {
    return (
        <div className="App">
            <ScatterPlot
              wineDataset={wineDataset}
            />
            <BarChart wineDataset={wineDataset} />
        </div>
    );
}

export default App;
