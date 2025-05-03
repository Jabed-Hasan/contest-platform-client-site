import { Chart } from 'react-google-charts';
import React from 'react';

const MuiChart = () => {
  // Calculate percentages that add up to 100%
  const winningChance = 45.5;
  const losingChance = 54.5;

  const data = [
    ['Chance', 'Percentage'],
    ['Winning Chance', winningChance],
    ['Losing Chance', losingChance],
  ];

  const options = {
    title: 'Win Overview',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
      color: '#212121',
    },
    colors: ['#4285F4', '#EA4335'], // Blue for winning, red for losing
    pieSliceText: 'percentage',
    pieSliceTextStyle: {
      fontSize: 14,
      color: 'white',
      bold: true,
    },
    legend: {
      position: 'right',
      alignment: 'center',
      textStyle: {
        fontSize: 14,
        color: '#212121',
      },
    },
    chartArea: {
      left: 10,
      top: 50,
      width: '80%',
      height: '80%',
    },
    backgroundColor: 'transparent',
    is3D: false,
    slices: {
      0: { offset: 0 },
      1: { offset: 0 },
    },
    tooltip: {
      showColorCode: true,
      text: 'percentage',
    },
  };

  return (
    <div className="win-overview-container">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        loader={<div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>}
      />
    </div>
  );
};

export default MuiChart;