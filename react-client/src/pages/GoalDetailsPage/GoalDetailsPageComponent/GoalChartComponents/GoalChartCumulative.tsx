import React from 'react';
import Chart from 'react-google-charts';
import LoadingSpinner from '../../../../sharedComponents/LoadingSpinner';

interface IProps {
  dataPoints: any;
}

const GoalChartCumulative: React.FC<IProps> = ({ dataPoints }) => {
  //format data array and configure tooltip
  return (
    <div className='border'>
      <Chart
        chartType='LineChart'
        loader={
          <div className='margin-3rem'>
            <LoadingSpinner />
          </div>
        }
        data={dataPoints}
        options={{
          chartArea: {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          },
          axisTitlesPosition: 'none',
          hAxis: {
            textPosition: 'none',
            baselineColor: 'none',
            gridlines: {
              color: 'transparent',
            },
            viewWindow: {
              min: 0,
            },
          },
          legend: {
            position: 'in',
          },
          vAxis: {
            textPosition: 'none',
            baselineColor: 'none',
          },
          titlePosition: 'none',
        }}
      />
    </div>
  );
};

export default GoalChartCumulative;
