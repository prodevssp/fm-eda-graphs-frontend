import axios from 'axios';
import { Histogram } from './Histogram';
import { Scatterplot } from './ScatterPlot';
import * as d3 from 'd3';
import { useEffect, useState } from 'react';

// export const fetchCalc = async (columns) => {
//   return axios
//     .post(`${process.env.REACT_APP_API_BASE_URL}api/pairplot/`, {
//       columns: columns,
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

export const Pairplot = ({ selectedColumns, data }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await fetchCalc(selectedColumns);

  //     console.log(data);

  //     setData(data);
  //   };

  //   fetch();
  // }, [selectedColumns]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (data.length > 0) {
    const allVariables = Object.keys(data[0]).filter((key) => key !== 'group');

    // Adjusting the graph size based on the window size and number of variables
    const graphWidth = 300;
    const graphHeight = 300;

    const boundsWidth = allVariables.length * graphWidth;
    const boundsHeight = allVariables.length * graphHeight;

    const buildHistogramData = (data, variable) => {
      const numBins = 10;
      const [min, max] = d3.extent(data, (d) => d[variable]);

      // Example of custom thresholds
      const thresholds = d3.range(min, max, (max - min) / numBins);

      const binGenerator = d3
        .bin()
        .value((d) => d[variable])
        .domain([min, max])
        .thresholds(thresholds);

      const bins = binGenerator(data);

      return bins.map((bin) => ({
        value: (bin.x0 + bin.x1) / 2,
        count: bin.length,
      }));
    };

    const buildScatterData = (data, xVar, yVar) => {
      return data.map((item) => ({
        x: item[xVar],
        y: item[yVar],
      }));
    };

    const allGraphs = allVariables
      .map((yVar, i) => {
        return allVariables.map((xVar, j) => {
          if (xVar === yVar) {
            const distributionData = buildHistogramData(data, xVar);

            return (
              <Histogram
                key={`${xVar}-${yVar}`}
                width={graphWidth}
                height={graphHeight}
                data={distributionData}
                limits={[0, 8]}
                xLabel={xVar}
                yLabel={yVar}
              />
            );
          } else {
            const scatterData = buildScatterData(data, xVar, yVar);

            return (
              <Scatterplot
                key={`${xVar}-${yVar}`}
                width={graphWidth}
                height={graphHeight}
                data={scatterData}
                xLabel={xVar}
                yLabel={yVar}
              />
            );
          }
        });
      })
      .flat();

    return (
      <div
        style={{
          width: windowSize.width * 0.97,
          height: windowSize.height * 0.9,
          overflow: 'auto',
          marginLeft: '120px',
        }}
      >
        <div
          style={{
            width: boundsWidth,
            height: boundsHeight,
            display: 'grid',
            gridTemplateColumns: `repeat(${allVariables.length}, 1fr)`,
            transform: 'translate(0, 0)', // Adjust as needed
            gap: '20px',
          }}
        >
          {allGraphs}
        </div>
      </div>
    );
  }
};
