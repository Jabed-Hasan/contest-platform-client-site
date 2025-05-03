
import { Chart } from 'react-google-charts';

const Statistics = () => {


  const data = [
    ['Task', 'Winning'],
    ['Participents', 60],
    ['Creator', 20],
  ];

  const options = {
    title: 'User Overview',
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