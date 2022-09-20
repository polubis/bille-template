import styled from 'styled-components';
import { Label, Title } from '../typography/typography';
import { ContentProp, DetailProps } from './models';

const isString = (arg: ContentProp): arg is string => typeof arg === 'string';

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  & > * {
    text-transform: uppercase;
  }
`;

const Value = styled.div`
  display: flex;
  align-items: center;
`;

export const Detail = ({ label, value }: DetailProps) => {
  return (
    <Container>
      <LabelWrapper>
        {isString(label) ? <Label>{label}</Label> : label(Label)}
      </LabelWrapper>
      <Value>{isString(value) ? <Title>{value}</Title> : value(Title)}</Value>
    </Container>
  );
};
