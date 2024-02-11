import * as d3 from 'd3';
import { useMemo } from 'react';

export const Scatterplot = ({ width, height, data, xLabel, yLabel }) => {
  const padding = 40; // Padding to prevent circles from touching the edges
  const circleRadius = 5; // Radius of the circles

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .range([padding, width - padding]); // Adjust range to fit within the width
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .range([height - padding, padding]); // Flip the range to fit within the height
  }, [data, height]);

  const circles = data.map((d, i) => (
    <circle
      key={i}
      r={circleRadius}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      opacity={1}
      stroke="#000"
      fill="#000"
      fillOpacity={0.2}
      strokeWidth={1}
    />
  ));

  // Axes
  const xAxis = d3.axisBottom(xScale).ticks(5);
  const yAxis = d3.axisLeft(yScale).ticks(5);

  // Margin for labels
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };

  return (
    <div>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {circles}
          {/* X-axis */}
          <g
            transform={`translate(0, ${height})`}
            ref={(node) => d3.select(node).call(xAxis)}
          />
          {/* Y-axis */}
          <g ref={(node) => d3.select(node).call(yAxis)} />
          {/* X-axis label */}
          <text
            transform={`translate(${width / 2},${height + 50})`}
            textAnchor="middle"
            style={{ fontSize: '14px' }}
          >
            {xLabel}
          </text>
          {/* Y-axis label */}
          <text
            transform={`translate(${-margin.left + 14},${
              height / 2
            }) rotate(-90)`}
            textAnchor="middle"
            style={{ fontSize: '14px' }}
          >
            {yLabel}
          </text>
        </g>
      </svg>
    </div>
  );
};
