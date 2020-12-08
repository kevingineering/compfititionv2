import React from 'react';
import Chart from 'react-google-charts';
import LoadingSpinner from '../../misc/LoadingSpinner';
import styled from 'styled-components';

interface IProps {
  dataPoints: any;
  chartXMax: number;
  chartYMax: number;
  chartYMin: number;
  isComp?: boolean;
}

const GoalChartDifference: React.FC<IProps> = ({
  dataPoints,
  chartXMax,
  chartYMax,
  chartYMin,
  isComp = false,
}) => {
  console.log(dataPoints);
  return (
    <Border>
      <Chart
        chartType='LineChart'
        loader={<LoadingSpinner hasContainer={true} hasBorder={false} />}
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
            maxValue: chartXMax,
          },
          legend: {
            position: isComp ? 'in' : 'none',
          },
          vAxis: {
            textPosition: 'none',
            baselineColor: 'none',
            maxValue: chartYMax + 1,
            minValue: chartYMin - 1,
          },
          titlePosition: 'none',
        }}
      />
    </Border>
  );
};

export default GoalChartDifference;

const Border = styled.div`
  border: 0.125rem solid var(--primary-color);
`;
