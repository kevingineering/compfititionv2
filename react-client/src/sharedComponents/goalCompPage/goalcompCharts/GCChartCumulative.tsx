import React from 'react';
import Chart from 'react-google-charts';
import LoadingSpinner from '../../misc/LoadingSpinner';
import styled from 'styled-components';

interface IProps {
  dataPoints: any;
  chartYMax: number;
}

const GCChartCumulative: React.FC<IProps> = ({ dataPoints, chartYMax }) => {
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
            maxValue: chartYMax && chartYMax + 1,
          },
          titlePosition: 'none',
        }}
      />
    </Border>
  );
};

export default GCChartCumulative;

const Border = styled.div`
  border: 0.125rem solid var(--primary-color);
`;
