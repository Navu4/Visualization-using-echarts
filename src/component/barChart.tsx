import { FC, useCallback } from "react";
import * as echarts from 'echarts';
import ReactECharts from "echarts-for-react";
import { wineDatasetType } from "../types";

interface BarChartProps {
    wineDataset: wineDatasetType[];
}
const BarChart: FC<BarChartProps> = ({ wineDataset }) => {
    const uniqueAlcoholTypes = wineDataset
        .map((item) => item.Alcohol)
        .filter((value, index, self) => self.indexOf(value) === index);

    const getData = useCallback(() => {
        let series = [];
        for (let index = 0; index < uniqueAlcoholTypes.length; index++) {
            const element = uniqueAlcoholTypes[index];
            let count = 0;
            const sumTotal = wineDataset.reduce((accumulator, a) => {
                if (element === a.Alcohol) {
                    count++;
                    return accumulator + a["Malic Acid"];
                }
                return accumulator;
            }, 0);
            series.push(sumTotal / count);
        }

        return series;
    }, [uniqueAlcoholTypes, wineDataset]);

    const option = {
        title: {
            text: 'Avg. Malic Acid Concentration in Different Alcohol Type',
        },
        xAxis: {
            name : 'Alcohol',
            type: "category",
            axisTick: {
                alignWithLabel: true
            },
            data: uniqueAlcoholTypes,
        },
        yAxis: {
            name : 'Avg. Malic Acid',
            type: "value",
        },
        tooltip: {
            axisPointer: {
                show: true,
            },
        },
        series: [
            {
                data: getData(),
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ])
                    }
                },
            },
        ],
    };
    return <ReactECharts option={option} style={{ height: 400 }} />;
};
export default BarChart;
