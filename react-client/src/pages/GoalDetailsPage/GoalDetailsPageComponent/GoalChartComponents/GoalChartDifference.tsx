import React from 'react';
import Chart from 'react-google-charts';
import LoadingSpinner from '../../../../sharedComponents/LoadingSpinner';

interface IProps {
  dataPoints: any;
  chartMax?: number;
}

const GoalChartDifference: React.FC<IProps> = ({ dataPoints, chartMax }) => {
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
          interpolateNulls: true,
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
            maxValue: chartMax,
          },
          legend: {
            position: 'none',
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

export default GoalChartDifference;
