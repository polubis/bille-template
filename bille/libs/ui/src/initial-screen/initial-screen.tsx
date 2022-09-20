import { Title } from '../typography/typography';
import { Rocket } from '../rocket/rocket';
import styled from 'styled-components';
import { InitialScreenProps } from './models';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${Title} {
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #00000080;
    position: absolute;
    top: 42px;
  }
`;

export const InitialScreen = ({ title }: InitialScreenProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Rocket size={156} />
    </Container>
  );
};
