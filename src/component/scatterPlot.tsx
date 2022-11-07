import { FC } from "react";
import ReactECharts from "echarts-for-react";
import { wineDatasetType } from "../types";

interface ScatterPlotType {
    wineDataset: wineDatasetType[];
}

const ScatterPlot: FC<ScatterPlotType> = ({ wineDataset }) => {
    const option = {
        title: {
            text: 'Color Intensity Vs Hue Scatter Plot',
        },
        xAxis: {
            name: "Color intensity",
        },
        yAxis: {
            name: "Hue",
        },
        series: [
            {
                type: "scatter",
                data: wineDataset.map((d) => [
                    Number(d["Color intensity"]),
                    d.Hue,
                ]),
            },
        ],
        tooltip: {
            axisPointer: {
                show: true,
                type: "cross",
                lineStyle: {
                    type: "dashed",
                    width: 1,
                },
            },
        },
    };
    return <ReactECharts option={option} style={{ height: 400 }} />;
};
export default ScatterPlot;
