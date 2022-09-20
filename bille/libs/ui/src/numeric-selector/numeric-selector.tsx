import styled from 'styled-components';
import { List } from '../list/list';
import { SmallTitleStyle } from '../typography/typography';
import { NumericSelectorItemProps, NumericSelectorProps } from './models';

export const NumericSelectorItem = styled.button<NumericSelectorItemProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  min-height: 50px;
  border-radius: 5px;
  border: none;
  ${SmallTitleStyle}

  &:focus {
    outline: none;
  }

  ${(props) => {
    if (props.disabled)
      return 'cursor: default; background: #ff000097; color: #000000;';

    if (props.active) {
      return 'background: #0fb2409d; color: #000000;';
    }

    return 'background: #rgba(0, 0, 0, 0.05); color: #000000;';
  }}
`;

const Container = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 8px;
`;

export const NumericSelector = ({ title, children }: NumericSelectorProps) => {
  return (
    <List title={title}>
      <Container>{children}</Container>
    </List>
  );
};
