import styled from 'styled-components';
import { PieChartProps } from './models';

export const PieChart = styled.div<PieChartProps>`
  border-radius: 50%;
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  background: conic-gradient(
    #ff6c6c 0deg
      ${(props) =>
        ((props.data[0] * 100) / (props.data[0] + props.data[1]) / 100) * 360 +
        'deg'},
    #8fd59a
      ${(props) =>
        ((props.data[0] * 100) / (props.data[0] + props.data[1]) / 100) * 360 +
        'deg'}
      360deg
  );
`;
