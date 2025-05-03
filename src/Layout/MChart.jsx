
import { Chart } from 'react-google-charts';

const Statistics = () => {


  const data = [
    ['Task', 'Winning'],
    ['Winning Chance', 50],
    ['Losing Chance', 60],
  ];

  const options = {
    title: 'Win Overview',
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        options={options}
        width={'100%'}
        height={'500px'}
        data={data}
      />
    </div>
  );
};

export default Statistics;