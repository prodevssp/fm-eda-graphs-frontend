import * as d3 from 'd3';
import React from 'react';

export const Histogram = ({ width, height, data, xLabel, yLabel }) => {
  // Setting up the scales
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([height, 0]);

  // Rendering the bars
  const barWidth = width / data.length;
  const allRects = data.map((d, i) => (
    <rect
      key={i}
      fill="#ff0000"
      stroke="black"
      x={xScale(d.value)}
      width={barWidth}
      y={yScale(d.count)}
      height={height - yScale(d.count)}
    />
  ));

  // Axes
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale);

  // Margin for labels
  const margin = { top: 20, right: 20, bottom: 60, left: 50 };

  return (
    <div>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {allRects}
          {/* X-axis */}
          <g
            transform={`translate(0, ${height})`}
            ref={(node) => d3.select(node).call(xAxis)}
          />
          {/* Y-axis */}
          <g ref={(node) => d3.select(node).call(yAxis)} />
          {/* X-axis label */}
          <text
            transform={`translate(${width / 2},${height + margin.bottom - 5})`}
            textAnchor="middle"
            style={{ fontSize: '14px' }}
          >
            {xLabel}
          </text>
          {/* Y-axis label */}
          <text
            transform={`translate(${-margin.left + 10},${
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
