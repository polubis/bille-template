import styled from 'styled-components';
import { Description } from '../typography';

export interface BarChartProps {
  data: [number, number];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div<{ fill: number }>`
  height: 150px;
  width: 35px;
  padding-right: 3px;
  border: 5px solid #96dbeb;
  border-radius: 0px 0px 25px 25px;
  z-index: 0;

  background: linear-gradient(
    to top,
    #ff5a00 ${(props) => `${props.fill}%`},
    rgba(255, 255, 255, 0) ${(props) => `${props.fill}%`}
  );
`;

const Reflection = styled.div`
  height: 90%;
  width: 100%;
  border-right: 6px solid #d2f7ff80;
  border-bottom: 6px solid rgba(255, 255, 255, 0);
`;

const Fill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px 3px 10px;
  border-radius: 10px;
  width: 50px;
  background: #323232;
  margin-bottom: -7px;
  z-index: 1;
  box-shadow: 0px 1px 2px #00000099;

  ${Description} {
    color: #ffffff;
  }
`;

export const BarChart = ({ data }: BarChartProps) => {
  const fill = data[0] > data[1] ? 100 : Math.round((data[0] / data[1]) * 100);

  return (
    <Wrapper>
      <Fill>
        <Description>{fill}%</Description>
      </Fill>
      <Container fill={fill}>
        <Reflection></Reflection>
      </Container>
    </Wrapper>
  );
};
