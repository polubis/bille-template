import styled from 'styled-components';
import { Label, SmallTitle } from '../typography/typography';
import { RangeProps } from './models';

const Container = styled.div`
  height: 48px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 5px 3px;

  ${SmallTitle} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  cursor: pointer;
  -webkit-appearance: none;
  margin: 0 15px 0 0;
  width: 100%;
  height: 8px;
  border-radius: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ff5a00;
    cursor: pointer;
    transition-duration: 0.1s;
    border: 2px solid black;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ff5a00;
    cursor: pointer;
    transition-duration: 0.1s;
  }
`;

export const Range = ({
  title,
  min = 1,
  max = 100,
  value = min,
  onChange,
}: RangeProps) => {
  const rangeValue = ((value - min) / (max - min)) * 100;

  return (
    <Container>
      <Header>
        <SmallTitle>{title}</SmallTitle>
        <Label>
          {value}/{max}
        </Label>
      </Header>
      <Input
        type="range"
        data-cy="range-input"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{
          background: `linear-gradient(90deg,#ff4500,${rangeValue}%,#d9d9d9 0%,#d9d9d9 100%)`,
        }}
      />
    </Container>
  );
};
